angular.module('DZAP', ['ui.router','hc.marked','ui.bootstrap','hljs'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
    .state("home", {
        url: "/home",
        templateUrl: "app/home/home.html",
        controller: "HomeController"
    })
    .state("about", {
        url: "/about/:id",
        templateUrl: "app/about/about.html",
        controller: "AboutController"
    })
    .state("install", {
        url: "/install",
        templateUrl: "app/install/install.html"
    })
    .state("config", {
        url: "/config/:id",
        templateUrl: "app/config/config.html",
        controller: "ConfigController"
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
.controller('AboutController',['$scope','$stateParams', function($scope,$stateParams) {
    $scope.isAddonSelected = function(i) {
        return $scope.activeAddonID == i;
    };
    $scope.selectAddon = function(i) {
        $scope.activeAddonID = i;
        if(i >= -1 && $scope.isAddonSelected(i)) {
            $scope.activeAddon = $scope.addon.mods[i];
        }
    };
    $scope.activeAddonID = -1;
    if(typeof $stateParams.id == "string" && $stateParams.id !== "") {
        var id = Number($stateParams.id);
        $scope.selectAddon(id);
    }
}])
.controller('ConfigController', ['$scope','$anchorScroll','$location','$stateParams', function($scope,$anchorScroll,$location,$stateParams){
    $scope.selectAddon = function(i) {
        $scope.activeAddonID = i;
    };
    $scope.isAddonSelected = function(i) {
        return $scope.activeAddonID === i;
    };
    $scope.clearSearch = function() {
        $scope.search = "";
    };
    $scope.activeAddonID = -1;
    if(typeof $stateParams.id == "string" && $stateParams.id !== "") {
        var id = Number($stateParams.id);
        $scope.selectAddon(id);
    }
}])
.controller('DZAPController', ['$scope','$sce', function($scope,$sce){
    $scope.addon = {
        name: "DayZ Epoch Addon Pack",
        downloadLink: "https://github.com/mudzereli/DayZ-Addon-Pack/archive/master.zip",
        version: [
            {name: "1.4.0", date: "7/28/2014", desc:"Map Marker Options: DZE_MAP_MARKER_VEHICLE_KEY_ONLY, DZE_MAP_MARKER_ZOMBIE_RANGE, DZE_MAP_MARKER_VEHICLE_RANGE, DZE_MAP_MARKER_FRIENDLY_RANGE"},
            {name: "1.3.0", date: "7/25/2014", desc:"Additional map marker addon features"},
            {name: "1.2.0", date: "7/25/2014", desc:"Addon for kits/rewards (spawn items in lockable safes)."},
            {name: "1.1.3", date: "7/24/2014", desc:"Fix potential take clothes exploit."},
            {name: "1.1.2", date: "7/22/2014", desc:"Fix hidden objects in deployable bike addon."},
            {name: "1.1.1", date: "7/22/2014", desc:"Fix bug with clothes taking addon."},
            {name: "1.1.0", date: "7/20/2014", desc:"Addon for taking clothes from bodies with mappable config."},
            {name: "1.0.1", date: "7/20/2014", desc:"Package mods together correctly."},
            {name: "1.0.0", date: "7/19/2014", desc:"First release."}
        ],
        mods: [
            {
                name: "Weapon Mods",
                color: "primary",
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
                gallery: $sce.trustAsResourceUrl("http://imgur.com/a/BmyqK/embed"),
                config: {
                    title: "Weapon Mods",
                    desc: "These configuration options control what weapon mods affect each weapon. They can be changed to whatever you desire.",
                    settings: [
                        {
                            name:       "DZE_WEAPON_MOD_ENABLE",
                            desc:       "If true, Weapon Mod addon is enabled. If false, Weapon Mod addon is disabled. REQUIRES DZE_CLICK_ACTIONS_ENABLE = true;",
                            format:     ["DZE_WEAPON_MOD_ENABLE = _boolean;"],
                            sample:     ["DZE_WEAPON_MOD_ENABLE = true;"],
                            sampleDesc: "Weapon Mod Addon Enabled"
                        },
                        {
                            name:       "DZE_WEAPON_MOD_ADMINS",
                            desc:       "Players who can add parts to weapons without actually having them.",
                            format:     ["DZE_WEAPON_MOD_ADMINS = [_adminPlayerUID1, _adminPlayerUID2, ...more...];"],
                            sample:     ["DZE_WEAPON_MOD_ADMINS = ['3242334','6574635242','2342034203213'];"],
                            sampleDesc: "3 Admins"
                        },
                        {
                            name:       "DZE_WEAPON_MOD_INV_CHECK_ITEMS",
                            desc:       "These items can be right clicked to show your weapon mod inventory.",
                            format:     ["DZE_WEAPON_MOD_INV_CHECK_ITEMS = [_checkItem1,_checkItem2, ...more...];"],
                            sample:     ["DZE_WEAPON_MOD_INV_CHECK_ITEMS = ['ItemToolbox'];"],
                            sampleDesc: "Right-Clicking Toolbox Shows Weapon Mods"
                        },
                        {
                            name:       "DZE_WEAPON_MOD_USE_HINT_INVENTORY",
                            desc:       "If true, the hint system will be used to track inventory. If false, a message with the inventory will be displayed in chat.",
                            format:     ["DZE_WEAPON_MOD_USE_HINT_INVENTORY = _boolean;"],
                            sample:     ["DZE_WEAPON_MOD_USE_HINT_INVENTORY = true;"],
                            sampleDesc: "Hint System Used Instead Of Chat"
                        },
                        {
                            name:       "DZE_WEAPON_MODS",
                            desc:       "Set up your mappings here to determine which guns can be modded.",
                            format:     ["DZE_WEAPON_MODS = [","    [_attachment,_base,_upgrade],","    [... more info here ...]","];"],
                            sample:     ["DZE_WEAPON_MODS = [","    ['GP25 GL','AK_74','AK_74_GL']","];"],
                            sampleDesc: "Able To Add / Remove GP25GL from AK_74 / AK_74_GL",
                            params:     [
                                {name: "_attachment", type: "string", example: "'GP25 GL'" , desc: "The name of the weapon attachment."},
                                {name: "_base"      , type: "string", example: "'AK_74'"   , desc: "The classname that the attachment is put on to."},
                                {name: "_upgrade"   , type: "string", example: "'AK_74_GL'", desc: "The classname that the attachment is taken off of."}
                            ]
                        },
                        {
                            name:       "DZE_WEAPON_MOD_COMBINE",
                            desc:       "You can use this to squash down weapon categories so that there aren't as many types of parts and mods are more compatible across weapons.",
                            format:     ["DZE_WEAPON_MOD_COMBINE = [","    [_combined,_attachments],","    [... more info here ...]","];"],
                            sample:     ["DZE_WEAPON_MOD_COMBINE = [","    ['G. Launcher',['M203 GL','GP25 GL']]","];"],
                            sampleDesc: "Combines M203 and GP25 Into Single Mod Called G. Launcher",
                            params:     [
                                {name: "_combined"   , type: "string", example: "'G. Launcher'"          , desc: "The name of the attachment which will be used."},
                                {name: "_attachments", type: "array",  example: "['M203 GL','GP25 GL']", desc: "The names of the attachments to combine."}
                            ]
                        },
                        {
                            name:       "DZE_WEAPON_MOD_IMAGE_MAP",
                            desc:       "You can use this to squash down weapon categories so that there aren't as many types of parts and mods are more compatible across weapons.",
                            format:     ["DZE_WEAPON_MOD_IMAGE_MAP = [","    [_weaponMod,_imageClass],","    [... more info here ...]","];"],
                            sample:     ["DZE_WEAPON_MOD_IMAGE_MAP = [","    ['Suppressor','64Rnd_9x19_SD_Bizon']","];"],
                            sampleDesc: "Uses the SD Bizon Picture For Suppressor Icon",
                            params:     [
                                {name: "_weaponMod" , type: "string", example: "'Suppressor'"         , desc: "The name of the attachment which will use the image."},
                                {name: "_imageClass", type: "string", example: "'64Rnd_9x19_SD_Bizon'", desc: "The class name of which the image will be used for the attachment."}
                            ]
                        }
                    ]
                }
            },
            {
                name: "Map Markers",
                color: "warning",
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
                gallery: $sce.trustAsResourceUrl("coming soon..."),
                config: {
                    title: "Map Markers",
                    desc: "Adds options for setting markers when right clicking a Map or GPS.",
                    settings: [
                        {
                            name:       "DZE_MAP_MARKER_ADDON_ENABLE",
                            desc:       "If true, Map Marker addon is enabled. If false, Map Marker addon is disabled. REQUIRES DZE_CLICK_ACTIONS_ENABLE = true;",
                            format:     ["DZE_MAP_MARKER_ADDON_ENABLE = _boolean;"],
                            sample:     ["DZE_MAP_MARKER_ADDON_ENABLE = true;"],
                            sampleDesc: "Map Marker Addon Enabled"
                        },
                        {
                            name:       "DZE_MAP_MARKER_ALLOW_SELF",
                            desc:       "If true, players can mark SELF on the map by right-clicking a Map or GPS.",
                            format:     ["DZE_MAP_MARKER_ALLOW_SELF = _boolean;"],
                            sample:     ["DZE_MAP_MARKER_ALLOW_SELF = true"],
                            sampleDesc: "Players Can Mark SELF On Map"
                        },
                        {
                            name:       "DZE_MAP_MARKER_ALLOW_FRIENDLIES",
                            desc:       "If true, players can mark FRIENDLIES on the map by right-clicking a Map or GPS.",
                            format:     ["DZE_MAP_MARKER_ALLOW_FRIENDLIES = _boolean;"],
                            sample:     ["DZE_MAP_MARKER_ALLOW_FRIENDLIES = true;"],
                            sampleDesc: "Players Can Mark FRIENDLIES On Map"
                        },
                        {
                            name:       "DZE_MAP_MARKER_FRIENDLY_RANGE",
                            desc:       "Distance within which FRIENDLIES appear on map. Only works if DZE_MAP_MARKER_ALLOW_FRIENDLIES = true.",
                            format:     ["DZE_MAP_MARKER_FRIENDLY_RANGE = _number;"],
                            sample:     ["DZE_MAP_MARKER_FRIENDLY_RANGE = 3000;"],
                            sampleDesc: "Players Will See FRIENDLIES Within 3000 meters."
                        },
                        {
                            name:       "DZE_MAP_MARKER_ALLOW_VEHICLES",
                            desc:       "If true, players can mark VEHICLES on the map by right-clicking a Map or GPS.",
                            format:     ["DZE_MAP_MARKER_ALLOW_VEHICLES = _boolean;"],
                            sample:     ["DZE_MAP_MARKER_ALLOW_VEHICLES = true;"],
                            sampleDesc: "Players Can Mark VEHICLES On Map"
                        },
                        {
                            name:       "DZE_MAP_MARKER_VEHICLE_KEY_ONLY",
                            desc:       "If true, players can only see VEHICLES they have the key for on the map by right-clicking a Map or GPS.",
                            format:     ["DZE_MAP_MARKER_VEHICLE_KEY_ONLY = _boolean;"],
                            sample:     ["DZE_MAP_MARKER_VEHICLE_KEY_ONLY = true;"],
                            sampleDesc: "Players Can Mark VEHICLES They Have Key For On Map"
                        },
                        {
                            name:       "DZE_MAP_MARKER_VEHICLE_RANGE",
                            desc:       "Distance within which VEHICLES appear on map. Only works if DZE_MAP_MARKER_ALLOW_VEHICLES = true.",
                            format:     ["DZE_MAP_MARKER_VEHICLE_RANGE = _number;"],
                            sample:     ["DZE_MAP_MARKER_VEHICLE_RANGE = 200;"],
                            sampleDesc: "Players Will See VEHICLES Within 200 meters."
                        },
                        {
                            name:       "DZE_MAP_MARKER_ALLOW_ZOMBIES",
                            desc:       "If true, players can mark ZOMBIES on the map by right-clicking a Map or GPS.",
                            format:     ["DZE_MAP_MARKER_ALLOW_ZOMBIES = _boolean;"],
                            sample:     ["DZE_MAP_MARKER_ALLOW_ZOMBIES = true;"],
                            sampleDesc: "Players Can Mark ZOMBIES On Map"
                        },
                        {
                            name:       "DZE_MAP_MARKER_ZOMBIE_RANGE",
                            desc:       "Distance within which ZOMBIES appear on map. Only works if DZE_MAP_MARKER_ALLOW_ZOMBIES = true.",
                            format:     ["DZE_MAP_MARKER_ZOMBIE_RANGE = _number;"],
                            sample:     ["DZE_MAP_MARKER_ZOMBIE_RANGE = 100;"],
                            sampleDesc: "Players Will See ZOMBIES Within 100 meters."
                        }
                    ]
                }
            },
            {
                name: "Take Clothes",
                color: "info",
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
                gallery: $sce.trustAsResourceUrl("coming soon..."),
                config: {
                    title: "Take Clothes",
                    desc: "Allows players to take clothes from AI, Players, and Zombies when scrolling over them.",
                    settings: [
                        {
                            name:       "DZE_TAKECLOTHES_ADDON_ENABLE",
                            desc:       "If true, Take Clothes addon is enabled. If false, Take Clothes addon is disabled. REQUIRES DZE_CLICK_ACTIONS_ENABLE = true;",
                            format:     ["DZE_TAKECLOTHES_ADDON_ENABLE = _boolean;"],
                            sample:     ["DZE_TAKECLOTHES_ADDON_ENABLE = false;"],
                            sampleDesc: "Take Clothes Addon Disabled"
                        },
                        {
                            name:       "DZE_TAKECLOTHES_MAP",
                            desc:       "A map of models to skin packages (use this to add clothes to models that aren't exact matches).",
                            format:     ["DZE_TAKECLOTHES_MAP = [","    [_model,_skinPackage],","    [...more...]","];"],
                            sample:     ["DZE_TAKECLOTHES_MAP = [","    ['z_policeman','Skin_RU_Policeman_DZ'],","    [...more...]","];"],
                            sampleDesc: "Police Skin Can Be Taken From Zombie Police",
                            params:     [
                                {name: "_model"      , type: "string", example: "'z_policeman'"         , desc: "The name of the model of the dead player/zombie/ai/etc."},
                                {name: "_skinPackage", type: "string", example: "'Skin_RU_Policeman_DZ'", desc: "The class name of the skin which should be given for that model."}
                            ]
                        }
                    ]
                }
            },
            {
                name: "Deploy Anything",
                color: "success",
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
                gallery: $sce.trustAsResourceUrl("http://imgur.com/a/jH8Lw/embed"),
                config: {
                    title: "Deploy Anything",
                    desc: "These configuration options control what can be deployed and who can deploy it.",
                    settings: [
                        {
                            name:       "DZE_DEPLOYABLES_ENABLE",
                            desc:       "If true, Deploy Anything addon is enabled. If false, Deploy Anything addon is disabled. REQUIRES DZE_CLICK_ACTIONS_ENABLE = true;",
                            format:     ["DZE_DEPLOYABLES_ENABLE = _boolean;"],
                            sample:     ["DZE_DEPLOYABLES_ENABLE = false;"],
                            sampleDesc: "Deploy Anything Addon Disabled"
                        },
                        {
                            name:       "DZE_DEPLOYABLES_CONFIG",
                            desc:       "Configure all of your deployable buildings/vehicles and options here.",
                            format:     ["DZE_DEPLOYABLES_CONFIG = [","    [_clickItem,_deployOffset,_packDistance,_damageLimit,_packAny,_cargo,_hive,_plot,_simulation,_road,_deployables,_near,_parts],","    [...more...]","];"],
                            sample:     ["DZE_DEPLOYABLES_CONFIG = [","    ['ItemToolbox',[0,2,1],5,0.1,false,false,false,false,true,true,['MMT_Civ'],[],['ItemToolbox']]","];"],
                            sampleDesc: "Deploy Temporary Bike. Can Be Repacked Under 10% Damage.",
                            params:     [
                                {name: "_clickItem"   , type: "string" , example: "'ItemToolbox'"  , desc: "Class name of the item to click on."},
                                {name: "_deployOffset", type: "array"  , example: "[0,2,1]"        , desc: "[_side,_front,_up] array to offset the deployable when buiding."},
                                {name: "_packDistance", type: "number" , example: "5"              , desc: "How close does the packer need to be to pack the object?"},
                                {name: "_damageLimit" , type: "number" , example: "0.1"            , desc: "Item can't be repacked if damage is > this. (-1 = no re-packing)."},
                                {name: "_packAny"     , type: "boolean", example: "false"          , desc: "Can anyone repack the deployable?"},
                                {name: "_cargo"       , type: "boolean", example: "false"          , desc: "Clear the cargo of the deployable?"},
                                {name: "_hive"        , type: "boolean", example: "false"          , desc: "Save deployed object to database?"},
                                {name: "_plot"        , type: "boolean", example: "true"           , desc: "Does the owner need a plot to build the object?"},
                                {name: "_simulation"  , type: "boolean", example: "true"           , desc: "Simulation enabled? Should almost always be true for vehicles."},
                                {name: "_road"        , type: "boolean", example: "true"           , desc: "Can the object be built on a road?"},
                                {name: "_deployables" , type: "array"  , example: "['MMT_Civ']"    , desc: "Array of class names that can be deployed with this method."},
                                {name: "_near"        , type: "array"  , example: "['fire']"       , desc: "Array of items required nearby to build (workshop/fire/fueltank)."},
                                {name: "_parts"       , type: "array"  , example: "['ItemToolbox']", desc: "Array of parts required to build (will be taken from player)."}
                            ]
                        },
                        {
                            name:       "DZE_DEPLOYABLE_NAME_MAP",
                            desc:       "Configure all of your deployable buildings/vehicles and options here.",
                            format:     ["DZE_DEPLOYABLE_NAME_MAP = [","    [_class,_name],","    [...more...]","];"],
                            sample:     ["DZE_DEPLOYABLE_NAME_MAP = [","    ['Notebook','MacBook Pro']","];"],
                            sampleDesc: "Rename 'Notebook' to 'Macbook Pro'.",
                            params:     [
                                {name: "_class", type: "string", example: "'Notebook'"   , desc: "Class name of the item you want to replace the name of."},
                                {name: "_name" , type: "string", example: "'MacBook Pro'", desc: "New name to display when right clicking & building."}
                            ]
                        },
                        {
                            name:       "DZE_DEPLOYABLE_ADMINS",
                            desc:       "These player UIDs can pack anything or deploy without parts.",
                            format:     ["DZE_DEPLOYABLE_ADMINS = [_adminPlayerUID1, _adminPlayerUID2, ...more...];"],
                            sample:     ["DZE_DEPLOYABLE_ADMINS = ['3242334','6574635242','2342034203213'];"],
                            sampleDesc: "3 Admins"
                        }
                    ]
                }
            },
            {
                name: "Safe Suicide",
                color: "warning",
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
                gallery: $sce.trustAsResourceUrl("http://imgur.com/a/Pt0lM/embed"),
                config: {
                    title: "Safe Suicide",
                    desc: "These configuration options are for customizing the Safe Suicide addon.",
                    settings: [
                        {
                            name:       "DZE_SUICIDE_ADDON_ENABLE",
                            desc:       "If true, Safe Suicide addon is enabled. If false, Safe Suicide addon is disabled. REQUIRES DZE_CLICK_ACTIONS_ENABLE = true;",
                            format:     ["DZE_SUICIDE_ADDON_ENABLE = _boolean;"],
                            sample:     ["DZE_SUICIDE_ADDON_ENABLE = false;"],
                            sampleDesc: "Safe Suicide Addon Disabled"
                        },
                        {
                            name:       "DZE_SUICIDE_GUNS",
                            desc:       "These items can be right clicked to commit suicide with an animated scene.",
                            format:     ["DZE_SUICIDE_GUNS = [_weaponClass1,_weaponClass2, ...more...];"],
                            sample:     ["DZE_SUICIDE_GUNS = ['M9','M9SD','Makarov','MakarovSD','Sa61_EP1','UZI_EP1','UZI_SD_EP1','revolver_EP1','revolver_gold_EP1','glock17_EP1','Colt1911'];"],
                            sampleDesc: "Add Commit Suicide Option To All Epoch Pistols."
                        },
                        {
                            name:       "DZE_SUICIDE_GENERIC",
                            desc:       "These items can be right clicked to commit suicide with a generic scene.",
                            format:     ["DZE_SUICIDE_GENERIC = [_weaponClass1,_weaponClass2, ...more...];"],
                            sample:     ["DZE_SUICIDE_GENERIC = ['ItemKnife','ItemHatchet_DZE','ItemCrowbar'];"],
                            sampleDesc: "Add Commit Suicide Option To Some Tools."
                        },
                        {
                            name:       "DZE_SUICIDE_REQUIRE_BULLET",
                            desc:       "If true, you need at least one bullet to kill yourself with a gun.",
                            format:     ["DZE_SUICIDE_REQUIRE_BULLET = _boolean;"],
                            sample:     ["DZE_SUICIDE_REQUIRE_BULLET = true;"],
                            sampleDesc: "Bullet Required"
                        },
                        {
                            name:       "DZE_SUICIDE_CANCEL_TIME",
                            desc:       "Number of seconds allowed for player to cancel by moving.",
                            format:     ["DZE_SUICIDE_CANCEL_TIME = _time;"],
                            sample:     ["DZE_SUICIDE_CANCEL_TIME = 0;"],
                            sampleDesc: "Wait 0 Seconds (instant)"
                        }
                    ]
                }
            },
            {
                name: "Reward Kits",
                color: "success",
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
                gallery: $sce.trustAsResourceUrl("coming soon..."),
                config: {
                    title: "Reward Kits",
                    desc: "These configuration options control what reward kits can be placed and who can place them.",
                    settings: [
                        {
                            name:       "DZE_KITS_ADDON_ENABLE",
                            desc:       "If true, Kit addon is enabled. If false, Kit addon is disabled. REQUIRES DZE_CLICK_ACTIONS_ENABLE = true;",
                            format:     ["DZE_KITS_ADDON_ENABLE = _boolean;"],
                            sample:     ["DZE_KITS_ADDON_ENABLE = false;"],
                            sampleDesc: "Kit Addon Disabled"
                        },
                        {
                            name:       "DZE_KIT_CONFIG",
                            desc:       "Configure your spawnable kits here.",
                            format:     ["DZE_KIT_CONFIG = [","    [_name,_contents],","    [...more...]","];"],
                            sample:     ["DZE_KIT_CONFIG = [","    ['Donator Kit #1',[[5,'ItemToolbox'],[2,'30m_plot_kit']]]","];"],
                            sampleDesc: "Spawn reward kit with 2 30m plots and 5 toolboxes in it.",
                            params:     [
                                {name: "_name"    , type: "string", example: "'Donator Kit #1'"                      , desc: "The name of the kit which is displayed on right clicking a vault."},
                                {name: "_contents", type: "array" , example: "[[5,'ItemToolbox'],[2,'30m_plot_kit']]", desc: "Array in the format of [[_amount,_item],[_amount,_item],[...more..]]."},
                            ]
                        },
                        {
                            name:       "DZE_KITS_ADMINS",
                            desc:       "These player UIDs can click the safe to view the spawn kit menu.",
                            format:     ["DZE_KITS_ADMINS = [_adminPlayerUID1, _adminPlayerUID2, ...more...];"],
                            sample:     ["DZE_KITS_ADMINS = ['3242334','6574635242','2342034203213'];"],
                            sampleDesc: "3 Admins"
                        }
                    ]
                }
            },
            {
                name: "Click Actions",
                color: "primary",
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
                gallery: $sce.trustAsResourceUrl("coming soon..."),
                config: {
                    title: "Click Actions",
                    desc: "These config options are for the click-actions addon. This allows you to add custom actions when you right click-items, such as self-bloodbag and view distance.",
                    settings: [
                        {
                            name:       "DZE_CLICK_ACTIONS_ENABLE",
                            desc:       "If true, Click Actions addon is enabled. If false, Click Actions addon is disabled.",
                            format:     ["DZE_CLICK_ACTIONS_ENABLE = _boolean;"],
                            sample:     ["DZE_CLICK_ACTIONS_ENABLE = true;"],
                            sampleDesc: "Click Actions Addon Enabled"
                        },
                        {
                            name:       "DZE_CLICK_ACTIONS",
                            desc:       "This is where you register your custom right-click actions.",
                            format:     ["DZE_CLICK_ACTIONS = [","    [_classname,_text,_execute,_condition],","    [...more...]","];"],
                            sample:     ["DZE_CLICK_ACTIONS = [","    ['ItemBloodbag','Self Transfusion','hint ''put some real code here!'';','true']","];"],
                            sampleDesc: "Right Click Bloodbag to Display Hint.",
                            params:     [
                                {name:"_classname", type:"string", example: "ItemBloodbag"                             , desc: "The name of the class to click on"},
                                {name:"_text"     , type:"string", example: "Self Transfusion"                         , desc: "The text for the option that is displayed when right clicking"},
                                {name:"_execute"  , type:"string", example: "execVM 'my\\scripts\\self_transfuse.sqf';", desc: "Uncompiled code to execute when the option is selected"},
                                {name:"_condition", type:"string", example: "true"                                     , desc: "Uncompiled code to check whether the option should be displayed"}
                            ]
                        }
                    ]
                }
            }
        ]
    };
}])
;