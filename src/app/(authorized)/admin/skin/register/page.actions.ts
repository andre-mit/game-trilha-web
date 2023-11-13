"use server";
import { fetchWrapper } from "@/services/fetchWrapper";
import { cookies } from "next/headers";

export default async function registerSkin(formData: FormData) {
  const name = formData.get("name");
  const price = formData.get("price");
  const description = formData.get("description");
  const imageFile = formData.get("backgroundImage");
  const imageBase64 = formData.get("image");

  const token = cookies().get("auth_token")?.value;
  const image = imageFile as File;

  const data = {
    name,
    description,
    image: imageBase64,
    ImageFileName: image.name,
    price,
  };

  try {
    const result = await fetchWrapper(
      "skins",
      {
        method: "POST",
        body: JSON.stringify(data),
        cache: "no-cache",
      },
      token,
      "json"
    );

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return { success: false, error: result.data };
    }
  } catch (e) {
    return {
      error: "Ocorreu um erro ao se comunicar com servidor. Tente novamente",
    };
  }
}
