"use server";

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import BaseResponse from "@/types/BaseResponse";

export async function POST(req: Request) {
  try {
    // Procesamos el formulario multipart/form-data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || !file.name) {
      return NextResponse.json({
        status: 400,
        message: "No se encontró el archivo o el nombre del archivo.",
      } as BaseResponse);
    }

    // Convertimos el File a Buffer para poder usar sharp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Intentamos comprimir/redimensionar la imagen con sharp
    let processedBuffer: Buffer;
    try {
      processedBuffer = await sharp(buffer)
        .resize({ width: 1024 }) // Redimensiona a un ancho máximo de 1024px
        .webp({ quality: 80 }) // Convierte a WEBP con calidad 80 (puedes ajustar según convenga)
        .toBuffer();
    } catch (err) {
      console.error("Error durante la compresión:", err);
      // Si falla la compresión, se usa el buffer original
      processedBuffer = buffer;
    }

    // Generamos un nombre único para la imagen
    const imageID = uuidv4();
    const fileExtension = "webp";
    const uniqueFileName = `${imageID}.${fileExtension}`;

    // Si se envía el nombre de una carpeta en el formulario, lo usamos; de lo contrario se usa la raíz
    const folder = (formData.get("projectID") as string) || "";
    const path = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

    // Conexión a Supabase utilizando las cookies
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Subimos la imagen procesada al bucket "images"
    const { data, error } = await supabase.storage
      .from("images")
      .upload(path, processedBuffer, {
        contentType: file.type,
      });

    if (error) {
      console.error("Error al subir imagen:", error);
      return NextResponse.json({
        status: 500,
        message: "Error al subir imagen",
        error: error.message,
      } as BaseResponse);
    }

    // Construimos la URL pública de la imagen
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;

    return NextResponse.json({
      status: 200,
      message: "Imagen subida correctamente",
      data: { url: imageUrl, fileName: uniqueFileName, imageID: imageID },
    } as BaseResponse);
  } catch (error: any) {
    console.error("Error en la API:", error);
    return NextResponse.json({
      status: 500,
      message: "Error en el servidor",
      error: error.message || error,
    } as BaseResponse);
  }
}
