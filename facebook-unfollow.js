/**
 * Facebook Safe Unfollow Script
 * 
 * A safe, rate-limit-aware script for bulk unfollowing on Facebook.
 * Designed to avoid detection and account restrictions.
 * 
 * WARNING: Use at your own risk. May violate Facebook's Terms of Service.
 * 
 * Usage:
 * 1. Open Facebook in your browser
 * 2. Navigate to your profile's Following page
 * 3. Open browser console (F12 → Console)
 * 4. Paste this entire script and press Enter
 * 
 * @version 1.0.0
 * @author Facebook Unfollow Tool
 */

(async function facebookSafeUnfollow() {
  'use strict';
  
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  // Configuration - Adjust these values carefully
  const CONFIG = {
    minDelay: 4000,           // Minimum 4 seconds between actions
    maxDelay: 10000,          // Maximum 10 seconds between actions  
    batchSize: 1,             // Process 1 profile at a time (safest)
    batchBreak: 30000,        // 30 second break between each action
    maxActions: 10,           // Stop after 10 unfollows (increase carefully)
    scrollDelay: 5000,        // Wait 5 seconds after scrolling
    maxScrollAttempts: 10,    // Maximum scroll attempts to load content
    loadWaitTime: 5000        // Initial wait time for page loading
  };
  
  let totalUnfollowed = 0;
  let scrollAttempts = 0;
  let isRunning = true;
  
  // Utility functions
  const log = (message, type = 'info') => {
    const emoji = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      debug: '🔍'
    };
    console.log(`${emoji[type] || 'ℹ️'} ${message}`);
  };
  
  // Check if we're on the right page
  log('Checking current page...');
  log(`Current URL: ${window.location.href}`);
  
  // Navigate to the Following page if not already there
  if (!window.location.href.includes('/following')) {
    log('Not on Following page. Attempting to navigate...', 'warning');
    
    // Look for the Following link in navigation
    const followingLink = Array.from(document.querySelectorAll('a'))
      .find(link => link.innerText.trim().toLowerCase() === 'following');
    
    if (followingLink) {
      log('Found Following link, clicking...', 'success');
      followingLink.click();
      log('Please wait for the Following page to load, then run the script again.', 'info');
      return;
    } else {
      log('Could not find Following link. Please manually navigate to:', 'error');
      log('facebook.com/[your-username]/following');
      return;
    }
  }
  
  log('On Following page, proceeding...', 'success');
  
  // Create emergency stop button
  const stopBtn = document.createElement('button');
  stopBtn.id = 'facebook-unfollow-stop';
  stopBtn.innerText = 'STOP UNFOLLOWING';
  stopBtn.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99999;
    padding: 15px 20px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
    transition: all 0.2s ease;
  `;
  
  stopBtn.onmouseover = () => {
    stopBtn.style.background = '#c0392b';
    stopBtn.style.transform = 'scale(1.05)';
  };
  
  stopBtn.onmouseout = () => {
    stopBtn.style.background = '#e74c3c';
    stopBtn.style.transform = 'scale(1)';
  };
  
  stopBtn.onclick = () => {
    isRunning = false;
    log('Emergency stop activated!', 'warning');
    stopBtn.innerText = 'STOPPING...';
    stopBtn.style.background = '#95a5a6';
  };
  
  document.body.appendChild(stopBtn);
  
  log('Starting Facebook safe unfollow process...', 'info');
  log(`Settings: ${CONFIG.batchSize} per batch, max ${CONFIG.maxActions} total`);
  
  // Initial content loading
  log('Loading content...');
  for (let i = 0; i < 5; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await delay(CONFIG.scrollDelay);
    log(`Loading scroll ${i + 1}/5`);
  }
  
  try {
    while (isRunning && totalUnfollowed < CONFIG.maxActions) {
      
      // Find Following buttons - look for exact "Following" text
      const followingButtons = Array.from(document.querySelectorAll('*'))
        .filter(el => {
          const text = (el.innerText || '').trim();
          
          // Must be exactly "Following" (not "1.4K following" or "followers")
          const isExactlyFollowing = text === 'Following';
          
          // Must be clickable
          const isClickable = el.tagName === 'BUTTON' || 
                              el.getAttribute('role') === 'button' ||
                              el.style.cursor === 'pointer' ||
                              getComputedStyle(el).cursor === 'pointer';
          
          // Must be visible and reasonably sized
          const isVisible = el.offsetParent !== null && 
                           el.offsetWidth > 20 && 
                           el.offsetHeight > 15;
          
          // Skip if already processed
          const notProcessed = !el.dataset.fbUnfollowProcessed;
          
          return isExactlyFollowing && isClickable && isVisible && notProcessed;
        });
      
      log(`Found ${followingButtons.length} "Following" buttons`, 'debug');
      
      if (followingButtons.length === 0) {
        log('Scrolling to load more profiles...');
        window.scrollTo(0, document.body.scrollHeight);
        await delay(CONFIG.scrollDelay);
        
        scrollAttempts++;
        if (scrollAttempts >= CONFIG.maxScrollAttempts) {
          log('No more Following buttons found after extensive scrolling.', 'warning');
          
          // Final debug information
          log('Current page analysis:', 'debug');
          
          const allFollowingText = Array.from(document.querySelectorAll('*'))
            .filter(el => (el.innerText || '').toLowerCase().includes('follow'))
            .slice(0, 10);
            
          if (allFollowingText.length > 0) {
            allFollowingText.forEach((el, i) => {
              const text = el.innerText.trim().substring(0, 50);
              console.log(`  ${i+1}. "${text}..." (${el.tagName})`);
            });
          } else {
            log('No follow-related content found on this page.', 'error');
            log('Try these steps:', 'info');
            log('  1. Make sure you\'re logged into Facebook');
            log('  2. Go to your profile');
            log('  3. Click on "Following" tab');
            log('  4. Scroll down to see people you follow');
            log('  5. Run this script again');
          }
          
          break;
        }
        continue;
      }
      
      // Process the first available Following button
      const btn = followingButtons[0];
      
      try {
        // Mark as processed to avoid clicking again
        btn.dataset.fbUnfollowProcessed = 'true';
        
        // Try to extract the profile name
        let profileName = 'Unknown Profile';
        const profileContainer = btn.closest('div');
        
        if (profileContainer) {
          // Look for name patterns in the container
          const textElements = Array.from(profileContainer.querySelectorAll('a, span, div'));
          
          for (let element of textElements) {
            const text = (element.innerText || '').trim();
            
            // Match typical name patterns (2-4 words, starting with capitals)
            if (text.match(/^[A-Z][a-z]+ [A-Z][a-z]+(\s[A-Z][a-z]+)?(\s[A-Z][a-z]+)?$/) && 
                text.length > 3 && 
                text.length < 60 && 
                text !== 'Following' &&
                !text.includes('Add') &&
                !text.includes('Edit')) {
              profileName = text;
              break;
            }
          }
        }
        
        log(`Unfollowing: ${profileName}`, 'info');
        
        // Click the Following button
        btn.click();
        totalUnfollowed++;
        
        log(`Successfully unfollowed ${totalUnfollowed}/${CONFIG.maxActions}`, 'success');
        
        // Random delay between actions to appear more human
        const waitTime = CONFIG.minDelay + Math.random() * (CONFIG.maxDelay - CONFIG.minDelay);
        log(`Waiting ${Math.round(waitTime/1000)} seconds before next action...`);
        await delay(waitTime);
        
        // Additional break between each unfollow
        if (totalUnfollowed < CONFIG.maxActions && isRunning) {
          log(`Taking safety break (${CONFIG.batchBreak/1000}s)...`);
          await delay(CONFIG.batchBreak);
        }
        
      } catch (error) {
        log(`Error processing button: ${error.message}`, 'error');
        console.error('Full error details:', error);
      }
      
      scrollAttempts = 0; // Reset after successful action
    }
    
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    console.error('Full error details:', error);
  } finally {
    // Cleanup
    if (stopBtn && stopBtn.parentNode) {
      stopBtn.remove();
    }
    
    // Final summary
    console.log('\n🎉 Process completed!');
    log(`Total unfollowed: ${totalUnfollowed}`, 'success');
    
    if (totalUnfollowed > 0) {
      console.log('\n💡 Important reminders:');
      console.log('  • Wait at least 2-3 hours before running again');
      console.log('  • Facebook may take time to update your Following count');
      console.log('  • If you received any warnings, wait 24+ hours');
      console.log('  • Consider manual unfollowing for better safety');
    } else {
      log('No profiles were unfollowed.', 'warning');
      console.log('\n🤔 This could mean:');
      console.log('  • You\'re not on the right page');
      console.log('  • Facebook changed their layout');
      console.log('  • The Following list hasn\'t loaded properly');
      console.log('  • You may have already unfollowed everyone visible');
    }
    
    console.log('\n⚠️  Remember: Use this tool responsibly and sparingly!');
  }
  
})();

// Usage instructions for users who run this script
console.log(`
📋 FACEBOOK SAFE UNFOLLOW SCRIPT LOADED
======================================

✅ Script is ready to run!

⚠️  IMPORTANT WARNINGS:
• This may violate Facebook's Terms of Service
• Could result in account restrictions
• Use at your own risk and responsibility

🚀 TO START:
• Make sure you're on your Facebook Following page
• The script will begin automatically
• Use the red STOP button if needed

📊 CURRENT SETTINGS:
• Max unfollows: 10 (very conservative)
• Delay between actions: 4-10 seconds
• Break between each: 30 seconds

Good luck and be safe! 🛡️
`);