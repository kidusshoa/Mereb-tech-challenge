import React, { useState, useEffect } from "react";
import axios from "axios";

const fetchContent = async (tabId) => {
  const response = await axios.get(`https://loripsum.net/api/1/short`);
  return response.data;
};

const Tabs = () => {
  // const tabs = [
  //     {
  //         id: 1,
  //         tabTitle: 'Tab 1',
  //         title: 'Title 1',
  //         content: 'In sint do non adipisicing incididunt excepteur sit. Voluptate esse aliqua pariatur dolor ex occaecat sunt eu. Pariatur ullamco id dolore sint proident sint nostrud nisi sit id est. Duis et excepteur cupidatat sint nisi dolore qui irure qui in id excepteur irure laboris. Pariatur mollit duis cupidatat nisi Lorem non et in dolor aliquip ea sint aute. Dolore aute duis laboris exercitation occaecat sunt. Enim veniam Lorem do ipsum aliqua qui eu ipsum consectetur ex dolore ea ipsum.'
  //     },
  //     {
  //         id: 2,
  //         tabTitle: 'Tab 2',
  //         title: 'Title 2',
  //         content: 'Non aliquip fugiat velit ad officia Lorem tempor cillum incididunt elit proident mollit. Reprehenderit qui nisi ut occaecat minim velit deserunt occaecat quis magna mollit. Veniam proident consectetur sunt mollit est magna Lorem voluptate enim cupidatat consequat. Et pariatur aliquip commodo nisi deserunt exercitation enim officia voluptate in nisi. Eu ea esse qui est ea pariatur nostrud non elit irure. Ad exercitation Lorem exercitation ipsum eiusmod ea duis ad mollit veniam aliquip veniam. Lorem pariatur elit ea duis.'
  //     },
  //     {
  //         id: 3,
  //         tabTitle: 'Tab 3',
  //         title: 'Title 3',
  //         content: 'Deserunt et elit elit ad dolor magna. Nisi amet consectetur Lorem eiusmod dolore adipisicing do reprehenderit. Voluptate consequat magna nostrud in officia labore. Minim excepteur consectetur quis nostrud nisi magna duis sunt sint qui. Fugiat ea reprehenderit eiusmod proident officia. Consequat labore qui velit Lorem consectetur incididunt ut nisi.'
  //     },
  //     {
  //         id: 4,
  //         tabTitle: 'Tab 4',
  //         title: 'Title 4',
  //         content: 'Minim in dolor do fugiat laborum duis labore consectetur. Amet ut sint ipsum dolor ad nostrud commodo sunt veniam enim aliquip nulla sint ullamco. Do cupidatat et quis laborum esse est commodo. Commodo sunt consectetur do consequat minim occaecat id magna ullamco consequat irure.'
  //     }
  // ];

  const tabs = [
    { id: 1, tabTitle: "Tab 1", title: "Title 1" },
    { id: 2, tabTitle: "Tab 2", title: "Title 2" },
    { id: 3, tabTitle: "Tab 3", title: "Title 3" },
    { id: 4, tabTitle: "Tab 4", title: "Title 4" },
  ];

  const [activeTab, setActiveTab] = useState(1);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTabContent = async () => {
      if (content[activeTab]) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchContent(activeTab);
        setContent((prevContent) => ({
          ...prevContent,
          [activeTab]: data,
        }));
      } catch (err) {
        setError("Failed to fetch content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTabContent();
  }, [activeTab, content]);

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
        {loading ? (
          <p>Loading content...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>{content[activeTab]}</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
