"use server";

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import BaseResponse from "@/types/BaseResponse";

export async function POST(req: NextRequest) {
  try {
    // Procesamos el formulario multipart/form-data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || !file.name) {
      return NextResponse.json({
        status: 400,
        message: "No Auth token provided",
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
        .jpeg({ quality: 80 }) // Convierte a JPEG con calidad 80 (puedes ajustar según convenga)
        .toBuffer();
    } catch (err) {
      console.error("Error during compression:", err);
      // Si falla la compresión, se usa el buffer original
      processedBuffer = buffer;
    }

    // Generamos un nombre único para la imagen
    const imageID = uuidv4();
    const fileExtension = "jpeg";
    const uniqueFileName = `${imageID}.${fileExtension}`;

    // Si se envía el nombre de una carpeta en el formulario, lo usamos; de lo contrario se usa la raíz
    const folder = (formData.get("projectID") as string) || "";
    const path = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

    // Conexión a Supabase
    const db = createClient(req);

    // Subimos la imagen procesada al bucket "images"
    const { data, error } = await db.storage
      .from("images")
      .upload(path, processedBuffer, {
        contentType: file.type,
      });

    if (error) {
      return NextResponse.json({
        status: 500,
        message: "Error uploading image",
        error: error.message,
      } as BaseResponse);
    }

    // Construimos la URL pública de la imagen
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;

    return NextResponse.json({
      status: 200,
      message: "Image uploaded successfully",
      data: { url: imageUrl, fileName: uniqueFileName, imageID: imageID },
    } as BaseResponse);
  } catch (error: any) {
    console.error("Error en la API:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      error: error.message || error,
    } as BaseResponse);
  }
}
