import { createClient } from "@/utils/supabase/middleware";
import BaseRequest from "@/types/BaseRequest";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

interface UploadImageProps extends BaseRequest {
  file: File;
  projectID: string;
}

export async function uploadImage({
  req,
  file,
  projectID,
}: UploadImageProps): Promise<{
  url?: string;
  imageID?: string;
  fileName?: string;
  error?: string;
  data?: any;
  status: number;
}> {
  // Convertimos el File a Buffer para poder usar sharp
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Intentamos comprimir/redimensionar la imagen con sharp
  let processedBuffer: Buffer;
  try {
    processedBuffer = await sharp(buffer)
      .resize({ width: 1024 })
      .webp({ quality: 80 })
      .toBuffer();
  } catch (error) {
    // Si falla la compresión, se usa el buffer original
    processedBuffer = buffer;
  }

  // Generamos un nombre único para la imagen
  const imageID = uuidv4();
  const fileExtension = "webp";
  const uniqueFileName = `${imageID}.${fileExtension}`;
  const path = `${projectID}/${uniqueFileName}`;

  // Conexión a Supabase
  const db = createClient(req);

  // Subimos la imagen procesada al bucket "images"
  const { data, error } = await db.storage
    .from("images")
    .upload(path, processedBuffer, {
      contentType: file.type,
    });

  if (error) {
    return { error: error.message, status: 500 };
  }

  if (!data) {
    return { error: "Error generating the img url", status: 500 };
  }

  // Construimos la URL pública de la imagen
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;

  return {
    data: {
      url: imageUrl,
      fileName: uniqueFileName,
      imageID,
      projectID,
    },
    status: 200,
  };
}
