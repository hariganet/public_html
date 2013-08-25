var g_mobiledevice = false;	//iPhone、iPad、Androidのときtrue
var g_browsername = 'unknown';
var g_browserver = -1;

if(checkUserAgent() == false) {
	window.alert('このブラウザは対象外です');
}


function checkUserAgent(){
	var ua = navigator.userAgent;

	//iPhoneか？	
	var mstr = ua.match(/iPhone OS \d+/);
	if(mstr != null){
		var vstr = mstr[0].match(/\d+/);
		if(parseInt(vstr[0]) >= 3) {
			g_mobiledevice = true;
			g_browsername = 'iPhone';
			//alert('major-version ' + vstr);
			return true;
		}
	}
	//iPadか？
	if(ua.indexOf('iPad') > -1){
		mstr = ua.match(/CPU OS \d+/);
		if(mstr != null){
			var vstr = mstr[0].match(/\d+/);
			if(parseInt(vstr[0]) >= 3) {
				g_mobiledevice = true;
				g_browsername = 'iPad';
				//alert('major-version ' + vstr);
				return true;
			}		
		}		
	}	
	//Androidか？	
	var mstr = ua.match(/Android \d+\.\d+/);
	if(mstr != null){
		g_browsername = 'Android';
		var vstr = mstr[0].match(/\d+\.\d+/);
		g_browserver = parseFloat(vstr[0]);
		g_mobiledevice = true;
		if(pg_browserver > 2.1) {
			//alert('version ' + vstr);
			return true;
		}
	}
	//Chromeか？
	mstr = ua.match(/Chrome\/\d+/);
	if(mstr != null){
		g_browsername = 'Chrome';
		var vstr = mstr[0].match(/\d+/);
		g_browserver = parseInt(vstr[0]);
		if(g_browserver >= 9) {
			//alert('major-version ' + vstr);
			return true;
		}		
	}
	//Safariか？
	if(ua.indexOf('Safari') > -1){
		mstr = ua.match(/Version\/\d+/);
		if(mstr != null){
			var vstr = mstr[0].match(/\d+/);
			if(parseInt(vstr[0]) >= 5) {
				g_browsername = 'Safari';
				//alert('major-version ' + vstr);
				return true;
			}		
		}		
	}
	//Internet Explorerか？
	mstr = ua.match(/MSIE \d+/);
	if(mstr != null){
		var vstr = mstr[0].match(/\d+/);
		if(parseInt(vstr[0]) >= 9) {
			g_browsername = 'MSIE';
			//alert('major-version ' + vstr);
			return true;
		}		
	}
	//Firefoxか？
	mstr = ua.match(/Firefox\/\d+/);
	if(mstr != null){
		var vstr = mstr[0].match(/\d+/);
		if(parseInt(vstr[0]) >= 4) {
			g_browsername = 'Firefox';
			//alert('major-version ' + vstr);
			return true;
		}		
	}
	//Operaか？
	if(ua.indexOf('Opera') > -1){
		mstr = ua.match(/Version\/\d+/);
		if(mstr != null){
			var vstr = mstr[0].match(/\d+/);
			if(parseInt(vstr[0]) >= 11) {
				g_browsername = 'Opera';
				//alert('major-version ' + vstr);
				return true;
			}		
		}		
	}
	
	return false;
}
