
import LocalizedStrings from 'react-native-localization';



export default class Localization{
	static strings = new LocalizedStrings({
	  "en-US": {
	  	main:{
	  		Login:"Login",
	  		MainTabbar:"Record",
	  		TestRefresh:"TestRefresh",
	  		XX:"XX",
	  		XXX:"XXX",
	  		Contact:"Contact",
	  		ChangeLanguage:"ChangeLanguage"
	  	},
	  	recode:{
	  		recode:"RECODE",
	  		play:"PLAY",
	  		stop:"STOP",
	  		pause:"PAUSE"
	  	},
	  	login:{
	  		username:"Username",
	  		password:"Password",
	  		fotgotten:"Forgotten password?",
	  		signin:"Sign In",
	  		facebook:"Login with facebook!",
	  		google:"Login with google+!"
	  	}
	  },
	  "zh-CN": {
	    main:{
	  		Login:"登录",
	  		MainTabbar:"录音",
	  		TestRefresh:"信息",
	  		XX:"XX",
	  		XXX:"XXX",
	  		Contact:"通讯录",
	  		ChangeLanguage:"切换语言"
	  	},
	  	recode:{
	  		recode:"录音",
	  		play:"播放",
	  		stop:"停止",
	  		pause:"暂停"
	  	},
	  	login:{
	  		username:"用户名",
	  		password:"密码",
	  		fotgotten:"忘记密码?",
	  		signin:"登	录",
	  		facebook:"使用facebook账户!",
	  		google:"使用google+账户!"
	  	}
	  }
	});
  static changeLanguage(language) {
    Localization.strings.setLanguage(language);
    return Localization.strings;
  }
}