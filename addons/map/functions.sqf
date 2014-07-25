fnc_map_marker_self_toggle = {
    DZE_SELF_MARKER_TOGGLE = !DZE_SELF_MARKER_TOGGLE;
    [] spawn fnc_map_marker_loop; 
    cutText[format["Self Map Marker: %1",str DZE_SELF_MARKER_TOGGLE],"PLAIN DOWN"];  
};

fnc_map_marker_friendly_toggle = {
    DZE_FRIENDLY_MARKER_TOGGLE = !DZE_FRIENDLY_MARKER_TOGGLE;
    [] spawn fnc_map_marker_loop; 
    cutText[format["Friendly Map Marker: %1",str DZE_FRIENDLY_MARKER_TOGGLE],"PLAIN DOWN"];  
};

fnc_map_marker_vehicle_toggle = {
    DZE_VEHICLE_MARKER_TOGGLE = !DZE_VEHICLE_MARKER_TOGGLE;
    cutText[format["Vehicle Map Marker: %1",str DZE_VEHICLE_MARKER_TOGGLE],"PLAIN DOWN"];  
};

fnc_map_marker_zombie_toggle = {
    DZE_ZOMBIE_MARKER_TOGGLE = !DZE_ZOMBIE_MARKER_TOGGLE;
    cutText[format["Zombie Map Marker: %1",str DZE_ZOMBIE_MARKER_TOGGLE],"PLAIN DOWN"];  
};

fnc_map_marker_loop = {
    if(DZE_MAP_MARKER_LOOP_RUNNING) exitWith {};
    DZE_MAP_MARKER_LOOP_RUNNING = true;
    private["_marker","_targetFriends","_targetCharID","_keys","_keyID"];
    while {("ItemMap" in (weapons player) || "ItemGPS" in (weapons player)) && {DZE_SELF_MARKER_TOGGLE || DZE_FRIENDLY_MARKER_TOGGLE || DZE_VEHICLE_MARKER_TOGGLE || DZE_ZOMBIE_MARKER_TOGGLE}} do {
        DZE_OLD_MAP_MARKER_LIST = DZE_MAP_MARKER_LIST;
        DZE_MAP_MARKER_LIST = [];

        if(DZE_SELF_MARKER_TOGGLE) then {
            _marker = createMarkerLocal["MarkerPlayer",(position player)];
            DZE_MAP_MARKER_LIST set [count DZE_MAP_MARKER_LIST, ["Player",getPosATL player]];
        };

        if(DZE_FRIENDLY_MARKER_TOGGLE) then {
            {
                if(alive _x) then {
                    _targetCharID = _x getVariable["CharacterID","0"];
                    _targetFriends = _x getVariable["FriendlyTo",[]];
                    if(_targetCharID != "0" && {dayz_characterID in _targetFriends}) then {
                        _marker = createMarkerLocal[format["F%1",str (getPos _x)],getPos _x];
                        _marker setMarkerShapeLocal "ICON";
                        _marker setMarkerTypeLocal "mil_dot";
                        _marker setMarkerTextLocal (name _x);
                        _marker setMarkerColorLocal "ColorBlue";
                        DZE_MAP_MARKER_LIST set [count DZE_MAP_MARKER_LIST, _marker];
                    };
                };
            } forEach (allMissionObjects "CAManBase");
        };

        if(DZE_VEHICLE_MARKER_TOGGLE) then {
            _keys = [];
            {
                _keyID = getNumber(configFile >> "CfgWeapons" >> _x >> "keyid");
                if(_keyID > 0) then {
                    _keys set [count _keys,_keyID];
                };
            } forEach (weapons player);
            {
                _veh = _x;
                if(alive _veh) then {
                    _targetCharID = _veh getVariable["CharacterID",1];
                    {
                        if((typeName _targetCharID) == "STRING") then {
                            _targetCharID = parseNumber _targetCharID;
                        };
                        if(_targetCharID == _x) then {
                            _marker = createMarkerLocal[format["V%1",str (getPos _veh)],getPos _veh];
                            _marker setMarkerShapeLocal "ICON";
                            _marker setMarkerTypeLocal "mil_dot";
                            _marker setMarkerTextLocal getText(configFile >> "CfgVehicles" >> (typeOf _veh) >> "displayName") ;
                            _marker setMarkerColorLocal "ColorOrange";
                            DZE_MAP_MARKER_LIST set [count DZE_MAP_MARKER_LIST, _marker];
                        };
                    } forEach _keys;
                };
            } forEach (allMissionObjects "AllVehicles");
        };

        if(DZE_ZOMBIE_MARKER_TOGGLE) then {
            {
                if(alive _x && {((getPosATL player) distance _x) < 100}) then {
                    _marker = createMarkerLocal[format["Z%1",str (getPos _x)],getPos _x];
                    _marker setMarkerShapeLocal "ICON";
                    _marker setMarkerTypeLocal "mil_dot";
                    _marker setMarkerTextLocal getText(configFile >> "CfgVehicles" >> (typeOf _x) >> "displayName");
                    _marker setMarkerColorLocal "ColorRed";
                    DZE_MAP_MARKER_LIST set [count DZE_MAP_MARKER_LIST, _marker];
                };
            } forEach (allMissionObjects "zZombie_Base");
        };

        {
            if(!(_x in DZE_MAP_MARKER_LIST)) then {
                deleteMarkerLocal _x;
            };
        } forEach DZE_OLD_MAP_MARKER_LIST;

        {
            _marker setMarkerShapeLocal "ICON";
            _marker setMarkerTypeLocal "mil_dot";
            _marker setMarkerTextLocal "me";
            _marker setMarkerColorLocal "ColorGreen";
        } forEach  DZE_MAP_MARKER_LIST;
        sleep 5;
    };
    DZE_MAP_MARKER_LOOP_RUNNING = false;
};