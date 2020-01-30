# 题目描述
https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
# 解析
https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/mai-mai-gu-piao-de-zui-jia-shi-ji-ii-by-leetcode/
# 示例代码
	class Solution {
	    public int maxProfit(int[] prices)
	    {
	        if(prices.length == 0)
	            return 0;
	        int valley = prices[0];
	        int peak = prices[0];
	        int maxProfit = 0;

	        int i= 0;
	        while (i < prices.length -1)
	        {
	            while (i < prices.length - 1 && prices[i] >= prices[i+1])
	                i++;
	            valley = prices[i];
	            while (i < prices.length - 1 && prices[i] <= prices[i+1])
	                i++;
	            peak = prices[i];
	
	            maxProfit += (peak - valley);
	        }
	
	        return maxProfit;
	    }
	}
