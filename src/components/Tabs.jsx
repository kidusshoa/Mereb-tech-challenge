import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchContent = async (tabId) => {
  const response = await fetch("https://loripsum.net/api/1/short");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.text();
};

const Tabs = () => {
  const tabs = [
    { id: 1, tabTitle: "Tab 1", title: "Title 1" },
    { id: 2, tabTitle: "Tab 2", title: "Title 2" },
    { id: 3, tabTitle: "Tab 3", title: "Title 3" },
    { id: 4, tabTitle: "Tab 4", title: "Title 4" },
  ];

  const [activeTab, setActiveTab] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tabContent", activeTab],
    queryFn: () => fetchContent(activeTab),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return (
    <div className="container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <h2>{tabs.find((tab) => tab.id === activeTab)?.title}</h2>
        {isLoading ? (
          <p>Loading content...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          <p>{data}</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
