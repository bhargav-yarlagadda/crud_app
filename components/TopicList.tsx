import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

// Fetch topics from the API
const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await res.json();  // Parse the JSON body here
    console.log("Fetched topics data:", data);  // This will show the fetched topics

    return data.details;  // Access the 'details' field from the response
  } catch (error) {
    console.log("Error loading topics: ", error);
    return [];  // Return an empty array in case of error
  }
};

// TopicsList component to display the topics
export default async function TopicsList() {
  const topics = await getTopics();  // Fetch topics

  // Handle case where no topics are returned or fetched
  return (
    <>
      {topics.map((t: any) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
