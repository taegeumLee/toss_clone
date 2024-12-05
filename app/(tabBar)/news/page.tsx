import { Suspense } from "react";
import NewsLoading from "./loading";

export default async function News() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error("뉴스 데이터를 불러오는데 실패했습니다");
    }

    const data = await response.json();
    console.log(data);

    return (
      <Suspense fallback={<NewsLoading />}>
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">주식 뉴스</h1>
          <div className="space-y-4">
            {data.items?.map((item: any, index: number) => (
              <div key={index} className="bg-neutral-800 p-4 rounded-lg">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  <h2
                    className="text-lg font-medium mb-2"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <p
                    className="text-sm text-neutral-400"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <span className="text-xs text-neutral-500">
                    {new Date(item.pubDate).toLocaleDateString()}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    );
  } catch (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500">뉴스를 불러오는데 실패했습니다.</p>
      </div>
    );
  }
}
