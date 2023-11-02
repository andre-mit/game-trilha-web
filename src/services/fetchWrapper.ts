type FetchWrapperProps<T> =
  | {
      success: true;
      data: T;
      statusCode: number;
    }
  | {
      success: true;
      data: string;
      statusCode: number;
    }
  | {
      success: true;
      data: null;
      statusCode: number;
    }
  | {
      success: false;
      data: string;
      statusCode: number;
    };

export async function fetchWrapper<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  token?: string | null,
  responseType: "json" | "text" | null = "json"
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
      statusCode: response.status,
    };
  }

  var data;
  switch (responseType) {
    case "json":
      data = (await response.json()) as T;
      return { success: true, data, statusCode: response.status };
    case "text":
      data = await response.text();
      return { success: true, data, statusCode: response.status };
    default:
      return { success: true, data: null, statusCode: response.status };
  }
}
