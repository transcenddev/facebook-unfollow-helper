# Contributing to Facebook Safe Unfollow

Thank you for your interest in contributing to this project! We welcome contributions that make the script safer, more reliable, and more user-friendly.

## 🚨 Important Guidelines

Before contributing, please understand:

- **Safety First**: All contributions must prioritize user account safety
- **Rate Limiting**: Never remove or reduce safety delays
- **Ethical Use**: Contributions should promote responsible usage
- **Testing**: Test thoroughly before submitting changes

## 🛡️ Safety Standards

All code contributions must adhere to these safety standards:

1. **Minimum Delays**: Never reduce delays below 3 seconds between actions
2. **Rate Limiting**: Always include breaks between batches
3. **Error Handling**: Graceful handling of all edge cases
4. **User Control**: Always provide emergency stop functionality
5. **Conservative Defaults**: Default settings should be very safe

## 🔧 How to Contribute

### 1. Fork the Repository

```bash
git clone https://github.com/yourusername/facebook-safe-unfollow.git
cd facebook-safe-unfollow
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

- Keep changes focused and atomic
- Follow existing code style
- Add comments for complex logic
- Test thoroughly on your own Facebook account

### 4. Test Your Changes

**Important**: Test responsibly!

- Test with small limits (max 5 unfollows)
- Monitor for any Facebook warnings
- Ensure the emergency stop button works
- Verify no unintended elements are clicked

### 5. Submit a Pull Request

- Provide a clear description of changes
- Explain the safety considerations
- Include any testing results
- Reference any related issues

## 🐛 Bug Reports

When reporting bugs, please include:

- **Browser and Version**: Chrome 120, Firefox 115, etc.
- **Facebook Layout**: Any recent changes you've noticed
- **Console Output**: Copy the full console log
- **Steps to Reproduce**: Clear step-by-step instructions
- **Expected vs Actual**: What should happen vs what happened

## 💡 Feature Requests

Before requesting features, consider: