// This module was written by milespratt (https://github.com/milespratt/bingmaps-react)

"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
import { useRouter } from "next/navigation";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
//exports.default = BingMapsReact;

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function BingMapsReact(_ref) {
  let {
    bingMapsKey = null,
    height = "100%",
    mapOptions = null,
    onMapReady = null,
    pushPins = null,
    pushPinsWithInfoboxes = null,
    viewOptions = null,
    width = "100%",
  } = _ref;
  // refs
  const mapContainer = (0, _react.useRef)(null);
  const map = (0, _react.useRef)(null); // removes pushpins
  const router = useRouter();

  function removePushpins(map, Maps) {
    for (var i = map.entities.getLength() - 1; i >= 0; i--) {
      var pushpin = map.entities.get(i);

      if (pushpin instanceof Maps.Pushpin) {
        map.entities.removeAt(i);
      }
    }
  } // add pushpins with infoboxes

  const addPushpinsWithInfoboxes = (0, _react.useCallback)(
    (pushPinsToAdd, infobox, map, Maps) => {
      removePushpins(map, Maps);
      pushPinsToAdd.forEach((pushPin) => {
        if (pushPin === null) {
          return;
        }

        const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
        newPin.metadata = _objectSpread({}, pushPin.options);
        Maps.Events.addHandler(newPin, "mouseover", (e) => {
          var _pushPin$infobox;

          infobox.setOptions(
            _objectSpread(
              {
                title: e.target.metadata.candidateName,
                description: e.target.metadata.id,
                htmlContent:
                  ((_pushPin$infobox = pushPin.infobox) === null ||
                  _pushPin$infobox === void 0
                    ? void 0
                    : _pushPin$infobox.infoboxHtml) || pushPin.infoboxHtml,
                location: newPin.getLocation(),
                visible: true,
                actions: [
                  {
                    label: `Go to exam page (${e.target.metadata.title})`,
                    eventHandler: () =>
                      router.push(`/exams/${e.target.metadata.id}`),
                  },
                  {
                    label: "Go to candidate's page",
                    eventHandler: () =>
                      router.push(
                        `/candidates/${
                          e.target.metadata.candidateId
                        }?name=${e.target.metadata.candidateName.replaceAll(
                          " ",
                          "+"
                        )}`
                      ),
                  },
                ],
              },
              pushPin.infobox
            )
          );
        });
        Maps.Events.addHandler(newPin, "mouseout", (e) => {
          infobox.setOptions({
            visible: false,
          });
        });

        Maps.Events.addHandler(newPin, "click", (e) => {
          router.push(`/exams/${e.target.metadata.id}`);
        });

        map.entities.push(newPin);
      });
    },
    []
  ); // add pushpins

  const addPushpins = (0, _react.useCallback)((pushPinsToAdd, map, Maps) => {
    removePushpins(map, Maps);
    pushPinsToAdd.forEach((pushPin) => {
      if (pushPin === null) {
        return;
      }

      const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
      map.entities.push(newPin);
    });
  }, []); // set view options

  function setMapViewOptions(map, viewOptions, Maps) {
    const options = _objectSpread({}, viewOptions);

    if (viewOptions.mapTypeId) {
      options.mapTypeId = Maps.MapTypeId[viewOptions.mapTypeId];
    }

    if (viewOptions.hideRoadLabels) {
      options.labelOverlay = Maps.LabelOverlay.hidden;
    }

    map.setView(options);
  } // set map options

  function setMapOptions(map, mapOptions, Maps) {
    const options = _objectSpread({}, mapOptions); // some map options require values from the Maps class
    // these conditional statements handle those cases

    if (mapOptions.navigationBarMode) {
      options.navigationBarMode =
        Maps.NavigationBarMode[mapOptions.navigationBarMode];
    }

    if (mapOptions.navigationBarOrientation) {
      options.navigationBarOrientation =
        Maps.NavigationBarOrientation[mapOptions.navigationBarOrientation];
    }

    if (mapOptions.supportedMapTypes) {
      options.supportedMapTypes = mapOptions.supportedMapTypes.map(
        (type) => Maps.MapTypeId[type]
      );
    }

    map.setOptions(options);
  } // make map, set options, add pins

  const makeMap = (0, _react.useCallback)(() => {
    const { Maps } = window.Microsoft; // only make a new map if one doesn't already exist

    if (!map.current) {
      map.current = new Maps.Map(mapContainer.current, {
        credentials: bingMapsKey,
      });
    } // set viewOptions, if any

    if (viewOptions) {
      setMapViewOptions(map.current, viewOptions, Maps);
    } // set mapOptions, if any

    if (mapOptions) {
      setMapOptions(map.current, mapOptions, Maps);
    } // add push pins, if any

    if (pushPins) {
      addPushpins(pushPins, map.current, Maps);
    } // add infoboxes, if any

    if (pushPinsWithInfoboxes) {
      const infobox = new Maps.Infobox(map.current.getCenter(), {
        visible: false,
      });
      infobox.setMap(map.current);
      addPushpinsWithInfoboxes(
        pushPinsWithInfoboxes,
        infobox,
        map.current,
        Maps
      );
    }

    onMapReady &&
      onMapReady({
        map,
      });
  }, [
    addPushpinsWithInfoboxes,
    addPushpins,
    bingMapsKey,
    mapOptions,
    onMapReady,
    pushPins,
    pushPinsWithInfoboxes,
    viewOptions,
  ]);
  (0, _react.useEffect)(() => {
    if (window.Microsoft && window.Microsoft.Maps) {
      makeMap();
    } else {
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "text/javascript");
      scriptTag.setAttribute(
        "src",
        "https://www.bing.com/api/maps/mapcontrol?callback=makeMap"
      );
      scriptTag.async = true;
      scriptTag.defer = true;
      document.body.appendChild(scriptTag);
      window.makeMap = makeMap;
    }
  }, [makeMap]);
  return /*#__PURE__*/ _react.default.createElement("div", {
    ref: mapContainer,
    style: {
      height: height,
      width: width,
    },
  });
}

export default BingMapsReact;
