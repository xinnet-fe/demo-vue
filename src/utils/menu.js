const navMenu = [
    {
        "code": "boss-nav-applicationcenter",
        "parentCode": null,
        "children": [{
            "code": "boss-navigation-systemsetup",
            "parentCode": "boss-nav-applicationcenter",
            "children": [{
                "code": "boss-app",
                "parentCode": "boss-navigation-systemsetup",
                "icon": "",
                "text": "应用管理",
                "url": "https://boss.xinnet.com/app/index.html",
                "target": "tab"
            }, {
                "code": "boss-resource",
                "parentCode": "boss-navigation-systemsetup",
                "icon": "",
                "text": "资源管理",
                "url": "https://boss.xinnet.com/resource/index.html",
                "target": "tab"
            }],
            "icon": "",
            "text": "系统设置",
            "url": "",
            "target": ""
        }, {
            "code": "boss-nav-logcenter",
            "parentCode": "boss-nav-applicationcenter",
            "icon": "",
            "text": "日志中心",
            "url": "https://logcenter.xinnet.com/",
            "target": "blank"
        }],
        "icon": "applicationCenter",
        "text": "应用中心",
        "url": "",
        "target": ""
    }
]

export default navMenu