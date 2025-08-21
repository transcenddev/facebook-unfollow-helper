/*
 * Facebook Safe Unfollow Bookmarklet
 * 
 * To use this bookmarklet:
 * 1. Copy the entire javascript: URL below
 * 2. Create a new bookmark in your browser
 * 3. Paste this as the URL (keep the javascript: prefix)
 * 4. Navigate to your Facebook Following page
 * 5. Click the bookmark to run the script
 */

javascript:(function(){
  const script = document.createElement('script');
  script.src = 'https://raw.githubusercontent.com/yourusername/facebook-safe-unfollow/main/facebook-unfollow.js';
  script.onload = function() {
    console.log('Facebook Safe Unfollow Script loaded from bookmarklet!');
  };
  script.onerror = function() {
    console.error('Failed to load script from GitHub. Using inline version...');
    
    /* Minified inline version for bookmarklet */
    const inlineScript = `
    (async function(){
      const delay=ms=>new Promise(r=>setTimeout(r,ms));
      const CONFIG={minDelay:4000,maxDelay:10000,batchSize:1,batchBreak:30000,maxActions:10,scrollDelay:5000,maxScrollAttempts:10};
      let totalUnfollowed=0,scrollAttempts=0,isRunning=true;
      
      if(!window.location.href.includes('/following')){
        const followingLink=Array.from(document.querySelectorAll('a')).find(link=>link.innerText.trim().toLowerCase()==='following');
        if(followingLink){followingLink.click();alert('Please wait for Following page to load, then click bookmarklet again.');return;}
        else{alert('Please navigate to your Following page first.');return;}
      }
      
      const stopBtn=document.createElement('button');
      stopBtn.id='fb-unfollow-stop';
      stopBtn.innerText='STOP';
      stopBtn.style.cssText='position:fixed;top:20px;right:20px;z-index:99999;padding:15px;background:#e74c3c;color:white;border:none;border-radius:8px;cursor:pointer;';
      stopBtn.onclick=()=>{isRunning=false;stopBtn.innerText='STOPPED';};
      document.body.appendChild(stopBtn);
      
      console.log('🚀 Facebook Safe Unfollow started...');
      
      for(let i=0;i<5;i++){
        window.scrollTo(0,document.body.scrollHeight);
        await delay(CONFIG.scrollDelay);
      }
      
      while(isRunning&&totalUnfollowed<CONFIG.maxActions){
        const followingButtons=Array.from(document.querySelectorAll('*')).filter(el=>{
          const text=(el.innerText||'').trim();
          return text==='Following'&&(el.tagName==='BUTTON'||el.getAttribute('role')==='button'||getComputedStyle(el).cursor==='pointer')&&el.offsetParent&&!el.dataset.processed;
        });
        
        if(followingButtons.length===0){
          window.scrollTo(0,document.body.scrollHeight);
          await delay(CONFIG.scrollDelay);
          scrollAttempts++;
          if(scrollAttempts>=CONFIG.maxScrollAttempts)break;
          continue;
        }
        
        const btn=followingButtons[0];
        btn.dataset.processed='true';
        btn.click();
        totalUnfollowed++;
        console.log(\`✅ Unfollowed \${totalUnfollowed}/\${CONFIG.maxActions}\`);
        
        await delay(CONFIG.minDelay+Math.random()*(CONFIG.maxDelay-CONFIG.minDelay));
        if(totalUnfollowed<CONFIG.maxActions&&isRunning)await delay(CONFIG.batchBreak);
        scrollAttempts=0;
      }
      
      stopBtn.remove();
      alert(\`Completed! Unfollowed \${totalUnfollowed} profiles.\`);
    })();
    `;
    
    eval(inlineScript);
  };
  
  document.head.appendChild(script);
})();

/*
 * BOOKMARKLET URL (copy this entire line as bookmark URL):
 * 
 * javascript:(function(){const script=document.createElement('script');script.src='https://raw.githubusercontent.com/yourusername/facebook-safe-unfollow/main/facebook-unfollow.js';script.onload=function(){console.log('Facebook Safe Unfollow Script loaded!');};script.onerror=function(){eval(`(async function(){const delay=ms=>new Promise(r=>setTimeout(r,ms));const CONFIG={minDelay:4000,maxDelay:10000,batchSize:1,batchBreak:30000,maxActions:10,scrollDelay:5000,maxScrollAttempts:10};let totalUnfollowed=0,scrollAttempts=0,isRunning=true;if(!window.location.href.includes('/following')){const followingLink=Array.from(document.querySelectorAll('a')).find(link=>link.innerText.trim().toLowerCase()==='following');if(followingLink){followingLink.click();alert('Please wait for Following page to load, then click bookmarklet again.');return;}else{alert('Please navigate to your Following page first.');return;}}const stopBtn=document.createElement('button');stopBtn.id='fb-unfollow-stop';stopBtn.innerText='STOP';stopBtn.style.cssText='position:fixed;top:20px;right:20px;z-index:99999;padding:15px;background:#e74c3c;color:white;border:none;border-radius:8px;cursor:pointer;';stopBtn.onclick=()=>{isRunning=false;stopBtn.innerText='STOPPED';};document.body.appendChild(stopBtn);console.log('🚀 Facebook Safe Unfollow started...');for(let i=0;i<5;i++){window.scrollTo(0,document.body.scrollHeight);await delay(CONFIG.scrollDelay);}while(isRunning&&totalUnfollowed<CONFIG.maxActions){const followingButtons=Array.from(document.querySelectorAll('*')).filter(el=>{const text=(el.innerText||'').trim();return text==='Following'&&(el.tagName==='BUTTON'||el.getAttribute('role')==='button'||getComputedStyle(el).cursor==='pointer')&&el.offsetParent&&!el.dataset.processed;});if(followingButtons.length===0){window.scrollTo(0,document.body.scrollHeight);await delay(CONFIG.scrollDelay);scrollAttempts++;if(scrollAttempts>=CONFIG.maxScrollAttempts)break;continue;}const btn=followingButtons[0];btn.dataset.processed='true';btn.click();totalUnfollowed++;console.log(\`✅ Unfollowed \${totalUnfollowed}/\${CONFIG.maxActions}\`);await delay(CONFIG.minDelay+Math.random()*(CONFIG.maxDelay-CONFIG.minDelay));if(totalUnfollowed<CONFIG.maxActions&&isRunning)await delay(CONFIG.batchBreak);scrollAttempts=0;}stopBtn.remove();alert(\`Completed! Unfollowed \${totalUnfollowed} profiles.\`);})();`)};document.head.appendChild(script);})();
 */