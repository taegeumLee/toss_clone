import { checkTime } from "../common/checkTime";

export interface NewsCardProps {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

export default function NewsCard({
  title,
  link,
  description,
  pubDate,
}: NewsCardProps) {
  return (
    <div className="min-w-[300px] flex-shrink-0 bg-neutral-800 rounded-lg p-4 hover:bg-neutral-700 transition-colors">
      <div className="flex flex-col h-full justify-between gap-2">
        <div>
          <h2
            className="text-lg font-medium mb-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="text-sm text-neutral-400 line-clamp-3 mb-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-neutral-500">
            {checkTime(new Date(pubDate))}
          </span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            자세히 보기
          </a>
        </div>
      </div>
    </div>
  );
}
