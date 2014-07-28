angular.module('DZAP', ['ui.router','hc.marked','ui.bootstrap'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise("home");

    $stateProvider
    .state("home", {
        url: "/home",
        templateUrl: "app/home/home.html",
        controller: "HomeController"
    })
    .state("about", {
        url: "/about",
        templateUrl: "app/about/about.html",
        controller: "AboutController"
    })
    .state("install", {
        url: "/install",
        templateUrl: "app/install/install.html"
    })
    .state("config", {
        url: "/config",
        templateUrl: "app/config/config.html"
    })
    .state("contact", {
        url: "/contact",
        templateUrl: "app/contact/contact.html"
    });
    marked.setOptions({gfm: true});
}])
.controller('HomeController', ['$scope', function($scope){
    $scope.features = [
        {icon: "fa-location-arrow", name: "Easy To Install"    , desc: "DZAP requires only one line added into the init.sqf of the mission file."},
        {icon: "fa-gear"          , name: "Highly Configurable", desc: "There is an editable documented config file that has tons of options."},
        {icon: "fa-exclamation"   , name: "Unique Features"    , desc: "Some features in DZAP are not available in other mods."},
        {icon: "fa-refresh"       , name: "Easy To Update"     , desc: "Since DZAP is easy to install, it's also easy to update when new versions of Epoch come out."},
        {icon: "fa-thumbs-up"     , name: "Lots Of Addons"     , desc: "There are addons for map markers, weapon mods, deployable objects, kits, and more."},
        {icon: "fa-check"         , name: "Very Compatible"    , desc: "Most of these scripts work well with other addons since there isn't a lot of overwriting of existing files."}
    ];
}])
.controller('AboutController',['$scope', function($scope) {
    $scope.activeAddonID = -1;
    $scope.isAddonSelected = function() {
        return $scope.activeAddonID >= 0;
    };
    $scope.selectAddon = function(i) {
        $scope.activeAddonID = i;
        if($scope.isAddonSelected()) {
            $scope.activeAddon = $scope.addon.mods[i];
        }
    };
}])
.controller('DZAPController', ['$scope','$sce', function($scope,$sce){
    $scope.addon = {
        name: "DayZ Epoch Addon Pack",
        downloadLink: "https://github.com/mudzereli/DayZ-Addon-Pack/archive/master.zip",
        version: [
            {name: "1.3.0", desc:"Additional map marker addon features"},
            {name: "1.2.0", desc:"Addon for kits/rewards (spawn items in lockable safes)."},
            {name: "1.1.3", desc:"Fix potential take clothes exploit."},
            {name: "1.1.2", desc:"Fix hidden objects in deployable bike addon."},
            {name: "1.1.1", desc:"Fix bug with clothes taking addon."},
            {name: "1.1.0", desc:"Addon for taking clothes from bodies with mappable config."},
            {name: "1.0.1", desc:"Package mods together correctly."},
            {name: "1.0.0", desc:"First release."}
        ],
        mods: [
            {
                name: "Weapon Mods",
                desc: [
                    "Lets players right click weapons and remove mods and then apply them to other weapons.",
                    "For example, you can take an ACOG scope off of an M4A1 and put it on a SA58, add Gold Paint to a revolver, etc.",
                    "**NOTE**: It only works with existing weapons, so you can't put a suppressor on a DMR or anything like that."
                ],
                features: [
                    "- configurable so you set your own combinations",
                    "- easy to use, just right click and remove or add the part",
                    "- admin list for adding modifications without the item"
                ],
                hasGallery: true,
                gallery: $sce.trustAsResourceUrl("http://imgur.com/a/BmyqK/embed")
            },
            {
                name: "Map Markers",
                desc: [
                    "Adds options for setting markers when right clicking a Map or GPS.",
                    "Each option can be disabled or enabled in the configuration file."
                ],
                features: [
                    "Allows optional Map Markers for:",
                    "- Vehicles Matching Keys",
                    "- Zombies",
                    "- Yourself",
                    "- Friendly Players"
                ],
                hasGallery: false,
                gallery: $sce.trustAsResourceUrl("coming soon...")
            },
            {
                name: "Take Clothes",
                desc: [
                    "Allows players to take clothes from AI, Players, and Zombies when scrolling over them.",
                    "It can be configured to use your own mappings so you can add whatever clothes you want to existing models."
                ],
                features: [
                    "- Mapping for non-direct models, so you can add, for example, soldier clothing to a soldier zombie.",
                    "- Cancellable animation. Players can't complain about being locked up in an action and getting killed.",
                    "- Works with epoch clothing packages."
                ],
                hasGallery: false,
                gallery: $sce.trustAsResourceUrl("coming soon...")
            },
            {
                name: "Deploy Anything",
                desc: [
                    "A deploy bike addon that can be configured to deploy pretty much any vehicle or building.",
                    "The greatest thing this addon is that it is that it is **extremely versatile** and covers a range of building needs.",
                    "After setting it up, the options will appear when right-clicking the configured object in the game."
                ],
                features: [
                    "- Deploy cars/vehicles/props.",
                    "- Optional database saving.",
                    "- Epoch building system.",
                    "- Optional part requirements.",
                    "- Configurable repacking for each object based on damage limit/owner/etc.",
                    "- Optional plot requirements for each item.",
                    "- Optionally require nearby items like epoch (fire/fueltank/workshop)."
                ],
                hasGallery: true,
                gallery: $sce.trustAsResourceUrl("http://imgur.com/a/jH8Lw/embed")
            },
            {
                name: "Safe Suicide",
                desc: [
                    "This is an addon for allowing players to kill themselves easier.",
                    "The suicide option is brought up by right-clicking your handgun so it's much safer and there is not much possibility of accidental suicide.",
                    "It can be configured for any gun or item in the game, so it's very versatile."
                ],
                features: [
                    "- Done via right-click so no accidental suicides.",
                    "- Can be configured to be cancelled by moving/etc.",
                    "- Better audio/visual cues and 3+ animations.",
                    "- Can be set up to use any item, not just guns."
                ],
                hasGallery: true,
                gallery: $sce.trustAsResourceUrl("http://imgur.com/a/Pt0lM/embed")
            },
            {
                name: "Reward Kits",
                desc: [
                    "A wonderful tool for rewarding your top donators or players.",
                    "You add players to an admin list, and then when they right-click a 'Personal Safe' item, it gives them the option to spawn a reward kit.",
                    "The reward kit comes filled with the items you set up in the configuration file, and you can set up multiple kits."
                ],
                features: [
                    "- Extremely easy to setup",
                    "- Great for rewarding donators/etc",
                    "- Can use any item in the game"
                ],
                hasGallery: false,
                gallery: $sce.trustAsResourceUrl("coming soon...")
            },
            {
                name: "Right Click Actions",
                desc: [
                    "This addon is the core of many other addons used in this pack.",
                    "It is used to add scripts/code/etc to right-click options.",
                    "You can also use this to add your own custom right-click actions and scripts"
                ],
                features: [
                    "- Custom right-click actions.",
                    "- Simple to set up.",
                    "- Allows mods to work together easily.",
                    "- Conditionally display options."
                ],
                hasGallery: false,
                gallery: $sce.trustAsResourceUrl("coming soon...")
            }
        ]
    };
}])
;