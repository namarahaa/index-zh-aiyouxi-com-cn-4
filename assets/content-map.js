// assets/content-map.js

const contentMap = {
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["爱游戏", "首页推荐", "热门", "最新"],
      items: [
        { name: "平台公告", url: "https://index-zh-aiyouxi.com.cn/notice" },
        { name: "精选游戏", url: "https://index-zh-aiyouxi.com.cn/featured" }
      ]
    },
    {
      id: "games",
      title: "游戏库",
      tags: ["爱游戏", "游戏分类", "角色扮演", "策略", "休闲"],
      items: [
        { name: "仙侠奇缘", tags: ["角色扮演", "仙侠"], url: "https://index-zh-aiyouxi.com.cn/games/xianxia" },
        { name: "三国争霸", tags: ["策略", "历史"], url: "https://index-zh-aiyouxi.com.cn/games/sanguo" },
        { name: "开心农场", tags: ["休闲", "模拟"], url: "https://index-zh-aiyouxi.com.cn/games/farm" }
      ]
    },
    {
      id: "news",
      title: "新闻资讯",
      tags: ["爱游戏", "新闻", "更新", "活动"],
      items: [
        { name: "版本更新日志", url: "https://index-zh-aiyouxi.com.cn/news/updates" },
        { name: "限时活动", url: "https://index-zh-aiyouxi.com.cn/news/events" }
      ]
    }
  ]
};

/**
 * 搜索过滤函数：根据关键词匹配分区或游戏项
 * @param {string} keyword - 搜索关键词
 * @returns {Array} 匹配结果数组，每个结果包含 section 和匹配的 items
 */
function searchContent(keyword) {
  if (!keyword || keyword.trim() === "") {
    return [];
  }

  const lowerKeyword = keyword.toLowerCase();
  const results = [];

  contentMap.sections.forEach(section => {
    const matchedItems = [];

    // 检查分区标题和标签
    const sectionMatch =
      section.title.toLowerCase().includes(lowerKeyword) ||
      section.tags.some(tag => tag.toLowerCase().includes(lowerKeyword));

    // 检查分区内的项
    section.items.forEach(item => {
      const itemMatch =
        item.name.toLowerCase().includes(lowerKeyword) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerKeyword)));

      if (itemMatch) {
        matchedItems.push(item);
      }
    });

    // 如果分区或项匹配，加入结果
    if (sectionMatch || matchedItems.length > 0) {
      results.push({
        section: {
          id: section.id,
          title: section.title,
          tags: section.tags
        },
        matchedItems: matchedItems.length > 0 ? matchedItems : section.items // 分区匹配时返回所有项
      });
    }
  });

  return results;
}

// 导出以供其他模块使用（假设在模块环境）
if (typeof module !== "undefined" && module.exports) {
  module.exports = { contentMap, searchContent };
}