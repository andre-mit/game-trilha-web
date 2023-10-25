type FetchWrapperProps<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      data: string;
    };

export async function fetchWrapper<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  token?: string | null
): Promise<FetchWrapperProps<T>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${input}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
        ...init?.headers,
      },
      ...init,
    }
  );

  if (!response.ok) {
    return {
      success: false,
      data: "Something went wrong",
    };
  }

  const data = (await response.json()) as T;
  console.log(data);
  return { success: true, data };
}
