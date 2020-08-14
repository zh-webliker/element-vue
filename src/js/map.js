var lastPoint = '',
	lastPointId = '';
$(function(){
	
	// 数据源：获取远程数据图层，包括免费的和商业的地图瓦片服务，如OpenStreetMap、OCG资源（WMS或WMTS）、矢量数据等
	var osmS = new ol.source.OSM();
	// ol.layer.Tile 用于显示瓦片资源，瓦片提供了预渲染，由特定分辨率的缩放级别组织的瓦片图片网格组成
	// ol.layer.Image 用于显示支持渲染服务的图片，这些图片可以用于任意范围和分辨率
	// ol.layer.Vector 用于显示在客户端做渲染的矢量数据
	// 创建一个使用Open Street Map地图源的瓦片图层
	var layer1 = [
		new ol.layer.Tile({
			source: new ol.source.OSM
		}),
		new ol.layer.Tile({
        	source: new ol.source.TileArcGISRest({
        		url: 'http://hnsuccess.eicp.net:6080/arcgis/rest/services/dcly_hlm/MapServer'
        	})
        })
	];
	var layer2 = new ol.layer.Tile({
		source: new ol.source.OSM
	});
	var layer3 = new ol.layer.Tile({
		source: new ol.source.XYZ({  //固定缩放级别和规律网格的图片
//			url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', // Open Street Map地图
//			url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0', // google地图
			url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}' // 高德地图
		})
	});
	var layer4 = new ol.layer.Tile({
    	source: new ol.source.TileArcGISRest({
    		url: 'http://hnsuccess.eicp.net:6080/arcgis/rest/services/dcly_hlm/MapServer'
    	})
    });
	// 影像地图
	var layer5 = new ol.layer.Tile({
	    source: new ol.source.TileWMS({
	        url: 'https://ahocevar.com/geoserver/wms',
	        params: {
	            'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
	        }
	    })
	});
	// 矢量图层
	var layer6 = new ol.layer.Image({
		title: 'Earthquakes',
		source: new ol.source.ImageVector({ // 分块渲染
			source: new ol.source.TileJSON({
				url: 'data/layers/7day-M2.5.json'
			})
		}),
		style: new ol.style.Style({
			image: new ol.style.Circle({
				radius: 3,
				fill: new ol.style.Fill({
					color: '#fff'
				})
			})
		})
	});
	
	// 初始化地图参数
 	var map = new ol.Map({
	    target: 'map',       // DOM中地图容器的id
//	    layers: layer1,      // 图层，可以在地图初始化一起进行初始化也可以后期通过addLayer方法进行添加
	    view: new ol.View({  // 视图，控制地图显示的位置以及层级等，也可通过map.setView(new ol.View({...}))设置
	    	projection: 'EPSG:4326',     // 指定投影使用EPSG:4326，一个等同于WGS84坐标系
//	   		center: [13380880, 3535823], // 默认使用的墨卡托投影坐标系EPSG:3857
	    	center: [102.7882, 24.8958],     // ol.proj.transform([104.06, 30.67],'EPSG:4326', 'EPSG:3857')将地理坐标系转化为墨卡托坐标系
	    	zoom: 9,
	    	minZoom: 0,
	    	maxZoom: 24,
	    	maxResolution: 0.703125
	    }),
	    controls: ol.control.defaults().extend([
//	    	new ol.control.Attribution({
//	    		collapsible: true
//	    	}),
//          new ol.control.ScaleLine({     // 比例尺控件
//		        units: 'degrees'
//		    }),
//		    new ol.control.FullScreen(),   // 全屏控件
		    new ol.control.Zoom(),         // 缩放控件
//		    new ol.control.OverviewMap(),  // 全局控件
		    new ol.control.MousePosition({ // 鼠标控件
	            coordinateFormat: ol.coordinate.createStringXY(4),
	            projection: 'EPSG:4326',
	            className: 'custom-mouse-position',
	            target: document.getElementById('mouse-position')
	        })
        ])
	 });
	 map.addLayer(layer1);
//	 map.addLayer(layer4);
	 
	 var pointLayer = new ol.layer.Vector({
	 	 source: new ol.source.Vector()
	 });
	 map.addLayer(pointLayer);
	 loadPoints(pointLayer, map);
 });
 
 function loadPoints(pointLayer, map){
 	var data = [
 		{"objectid":1, "longa": 102.7882, "lati": 24.8958, "mc": "点位名称1"},
 		{"objectid":2, "longa": 102.6385, "lati": 24.9899, "mc": "点位名称2"},
 		{"objectid":3, "longa": 102.6605, "lati": 24.9349, "mc": "点位名称3"},
 		{"objectid":4, "longa": 102.6481, "lati": 24.8141, "mc": "点位名称4"},
 		{"objectid":5, "longa": 102.6038, "lati": 24.6987, "mc": "点位名称5"},
 		{"objectid":6, "longa": 102.7099, "lati": 24.6754, "mc": "点位名称6"},
 		{"objectid":7, "longa": 102.7072, "lati": 24.7262, "mc": "点位名称7"}
 	];
 	for(var i in data){
 		var arr = [];
 		arr.push(data[i].longa);
 		arr.push(data[i].lati);
 		var pointfeature = new ol.Feature({
		 	geometry: new ol.geom.Point(arr),
		 	name: data[i].mc,
		 	data: data[i]
		});
		var textStyle = new ol.style.Style({
		 	image: new ol.style.Icon({
		 		src: 'images/point2.png'
		 	}),
		 	text: new ol.style.Text({
		 		text: data[i].mc,
		 		offsetX: 0,
		 		offsetY: 7,
		 		font: '14px sans-serif',
		 		fill: new ol.style.Fill({
		 			color: '#9932CC'
		 		})
		 	})
		 });
		 pointfeature.setId(data[i].objectid);
		 pointfeature.setStyle(textStyle);
		 pointLayer.getSource().addFeature(pointfeature);
 	}
 	map.on('click', function(evt){
//		var lastPoint = pointLayer.getSource().getFeatureById(lastPointId);
 		var pixel = map.getEventPixel(evt.originalEvent);
 		// 判断当前单击处是否有要素
        var newfeature = map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        });
        var coordinate = evt.coordinate;
        // 高亮显示图标
        if (newfeature !== undefined) {
        	updateIcon(lastPoint, newfeature);
        	lastPoint = newfeature;
        	lastPointId = newfeature.getId();
        }
 	});
 	map.on('pointermove', function(evt){
 		var pixel = map.getEventPixel(evt.originalEvent);
 		// 判断当前单击处是否有要素
        var newfeature = map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        });
        if (newfeature !== undefined) {
        	console.log(0)
        }
 	});
 	map.on('mouseout', function(evt){
 		alert(1);
 		var pixel = map.getEventPixel(evt.originalEvent);
 		// 判断当前对象处是否有要素
        var newfeature = map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        });
        if (newfeature !== undefined) {
        	
        }
 	});
 }
 
 function updateIcon(lastPoint, feature){
	if(lastPoint){
		lastPoint.setStyle(new ol.style.Style({
			image: new ol.style.Icon({
				src: 'images/point2.png'
			}),
			text: new ol.style.Text({
		 		text: lastPoint.H.name,
		 		offsetX: 0,
		 		offsetY: 7,
		 		font: '14px sans-serif',
		 		fill: new ol.style.Fill({
		 			color: '#9932CC'
		 		})
		 	})
		}));
	}
	if(feature){
		feature.setStyle(new ol.style.Style({
			image: new ol.style.Icon({
	 			src: 'images/point3.png'
	 		})
		}));
	}
 }