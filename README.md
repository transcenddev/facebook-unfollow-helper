# Facebook Safe Unfollow Script

A safe, rate-limit-aware JavaScript script for bulk unfollowing on Facebook. This script is designed to avoid detection and account restrictions by using human-like timing patterns and conservative batch processing.

[![Image Alt Text](https://i.postimg.cc/MH6vYKGq/CA2-D7361-D7-E4-4-C1-F-A7-BC-8-B71730-C452-C.png)](https://postimg.cc/9Rkmm2Tn)

## ⚠️ Important Disclaimer

**Use at your own risk.** This script:

- May violate Facebook's Terms of Service
- Could result in account restrictions or bans
- Is provided for educational purposes only
- Should be used responsibly and sparingly

## ✨ Features

- **Rate-limit safe**: Conservative delays and batch processing
- **Human-like behavior**: Random timing and long breaks
- **Auto-navigation**: Attempts to navigate to the correct Following page
- **Emergency stop**: Red stop button for immediate halt
- **Detailed logging**: Shows progress and debugging information
- **Profile detection**: Tries to identify who is being unfollowed

## 🚀 How to Use

### Prerequisites

- You must be logged into Facebook
- Navigate to your Facebook profile
- Ensure you can see your Following list

### Method 1: Browser Console (Recommended)

1. **Open your Facebook profile** in a web browser
2. **Open Developer Tools** (F12 or right-click → Inspect)
3. **Go to the Console tab**
4. **Copy and paste** the entire script from `facebook-unfollow.js`
5. **Press Enter** to run the script

### Method 2: Browser Bookmarklet

1. **Copy the bookmarklet code** from `bookmarklet.js`
2. **Create a new bookmark** in your browser
3. **Paste the code as the URL** (keep the `javascript:` prefix)
4. **Navigate to your Facebook Following page**
5. **Click the bookmark** to run the script

## ⚙️ Configuration

The script includes several safety settings that can be adjusted:

```javascript
const CONFIG = {
  minDelay: 4000, // Minimum 4 seconds between actions
  maxDelay: 10000, // Maximum 10 seconds between actions
  batchSize: 1, // Process 1 profile at a time
  batchBreak: 30000, // 30 second break between each
  maxActions: 10, // Stop after 10 unfollows (very safe)
  scrollDelay: 5000, // Wait 5 seconds after scrolling
  maxScrollAttempts: 10, // Maximum scroll attempts to load content
};
```

### Making it More/Less Conservative

**More Conservative** (safer):

- Increase `minDelay` and `maxDelay`
- Decrease `maxActions`
- Increase `batchBreak`
- Run less frequently (once per day maximum)

**Less Conservative** (higher risk):

- Decrease delays (not recommended)
- Increase `maxActions` (maximum 50 recommended)
- **Never remove the breaks entirely**

## 🛡️ Safety Features

- **Emergency Stop Button**: Red button appears on page for immediate halt
- **Page Detection**: Verifies you're on the correct Following page
- **Rate Limiting**: Built-in delays to avoid triggering Facebook's anti-bot measures
- **Error Handling**: Graceful recovery from unexpected issues
- **Conservative Defaults**: Safe settings out of the box

## 📊 What to Expect

When running successfully, you'll see output like:

```
🔍 Checking current page...
✅ On Following page, proceeding...
🚀 Starting Facebook unfollow process...
📄 Loading content...
🔍 Found 3 "Following" buttons
👤 Unfollowing: John Doe
✅ Successfully unfollowed 1/10
⏳ Waiting 6 seconds before next action...
⏸️ Taking break (30s)...
```

## 🚨 Warning Signs

**Stop immediately if you see:**

- Facebook asking you to verify your identity
- Any security warnings or captchas
- "Action Blocked" messages
- Unusual behavior (buttons not responding)

If you encounter any of these, wait at least 24 hours before trying again.

## 🔧 Troubleshooting

### "No Following buttons found"

- Make sure you're on the Following page, not Followers
- Try scrolling down manually to load profiles
- Refresh the page and try again
- Check if Facebook has changed their layout

### Script clicking wrong elements

- Facebook frequently changes their structure
- The script may need updates for new layouts
- Try refreshing and running again

### Account warnings or restrictions

- Stop using the script immediately
- Wait at least 24-48 hours
- Consider manual unfollowing instead

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Test your changes thoroughly
4. Submit a pull request with a clear description

### Areas for improvement:

- Better profile name detection
- Support for different Facebook layouts
- Enhanced error handling
- More robust button detection

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Notice

This script is provided for educational and research purposes only. Users are responsible for complying with Facebook's Terms of Service and applicable laws. The authors are not responsible for any consequences resulting from the use of this script.

**Use responsibly and at your own risk.**

## 🙏 Acknowledgments

- Created for users who need to manage large Following lists
- Designed with safety and rate-limiting as primary concerns
- Based on research into Facebook's anti-automation measures

---

**Remember**: The safest approach is always manual unfollowing. This script should be used sparingly and as a last resort for managing very large Following lists.
