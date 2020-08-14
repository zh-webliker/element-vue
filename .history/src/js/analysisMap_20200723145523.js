// ol组件，按需引用
import "ol/ol.css";
import {Map, Feature, View, Overlay} from "ol";
import {Circle, Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon} from "ol/geom";
import WMTS from 'ol/tilegrid/WMTS';
import {Vector as VectorSource, OSM, XYZ, TileArcGISRest, WMTS as WMTSSource} from "ol/source";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import {Circle as geomCircle, Fill, Stroke, Style, Text, Icon} from "ol/style";
import {click, pointerMove, altKeyOnly} from 'ol/events/condition';
import {defaults as defaultControls, ScaleLine} from 'ol/control';
import {Select, Draw} from 'ol/interaction';
import {getArea, getLength} from 'ol/sphere';
import {easeOut} from 'ol/easing';
import {getCenter} from 'ol/extent';
import {unByKey} from 'ol/Observable';
import {EsriJSON, GeoJSON} from 'ol/format';
import {getVectorContext} from 'ol/render';
import {transform} from 'ol/proj';

//河流扩充
import * as jsts from 'jsts'

// 加入静态资源 省界 市州 河流 省级地界
import guizhou from '../json/guizhou' // 市州界
import river from '../assets/static_data/river.json'; // 河流
import provincial from '../assets/static_data/sjx.json'; //省界

import {getPointImg} from "../utils/config";

export default {
	data() {
		return {
			map: null,
			layers: {
				vectorLayer: null, // 矢量地图
				portraitLayer: null, // 影像地图
				line_layer: null, // 影像地图（线）
				shj_layer: null, // 省界
				ly_layer: null, // 流域划分图
				one_layer: null, // 一级控制单元
				two_layer: null, // 二级控制单元
				three_layer: null, // 三级控制单元
				basin_layer: null, // 水质流域临时图层
				river_layer: null, // 河流临时图层
                point_layer: null, //点位图层
                circle_layer: null,//根据中心点画圆
				test_layer: null,
			},
			center:[105.636454, 26.929864],
            bz_img : {
                normal : require("../assets/bz.png"),
            },
			zoom:8,
			token: '469cfd9c133f30baaf3f94a9cd848c47',
			overlay: null, // 点位窗口
			clickSelect: null, //地图点击选中
			selectedByAttriFeature: null,
			mapServeIp:'http://hnsuccess.eicp.net:6080',
			analysis_type : 1,
			points : []
		};
	},
	methods: {
		mapInit() {
			// 影像地图
			this.layers.portraitLayer = new TileLayer({
				source: new XYZ({
					url: `http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${this.token}`,
					crossOrigin: 'anonymous'
				}),
				opacity: 0.8,
				zIndex: 1,
				visible: true
			});
			// 影像图线
			this.layers.line_layer = new TileLayer({
				source: new XYZ({
					url: `http://t1.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${this.token}`,
				}),
				crossOrigin: 'anonymous',
				zIndex: 1,
				visible: true
			});
			this.map = new Map({
				target: 'analysis-map-view', //地图div id
				layers: [this.layers.portraitLayer,this.layers.line_layer], //影像图，矢量图
				//视图，这里设置坐标系
				view: new View({
					center: this.center,
					zoom: this.zoom,
					projection: 'EPSG:4326',
					minZoom: 7,
					maxZoom : 17,
					constrainOnlyCenter: true,
					smoothExtentConstraint: false,
					multiWorld: false
				}),
				//控制组件
				controls: defaultControls({
					attribution: false,
					zoom: false,
					rotate: false
				}).extend([])
			});
			this.addLayers();

			this.map.on('click',e => {
				if(this.analysis_type === 2){
                    this.setCoordinate(e.coordinate)
				}
            })
			// 添加点位弹窗
			// this.overlay = new Overlay({
			// 	element: this.$refs.overlay,
			// 	autoPan: true, // 如果弹窗在底图边缘时，底图会移动
			// 	autoPanAnimation: {
			// 		duration: 250 //底图移动动画时间
			// 	},
			// 	offset: [15, -160], //移动的偏移量
			// 	zIndex: 500
			// });
			// this.map.addOverlay(this.overlay);
		},
		//添加图层
		addLayers() {
			//省界
			this.layers.shj_layer = new TileLayer({
				source: new TileArcGISRest({
					url: this.mapServeIp+'/arcgis/rest/services/gzly/shengjie/MapServer',
					crossOrigin: 'anonymous'
				}),
				zIndex: 5,
				visible: true
			});
			this.map.addLayer(this.layers.shj_layer);
			//流域划分图
			this.layers.ly_layer = new TileLayer({
				source: new TileArcGISRest({
					url: this.mapServeIp+'/arcgis/rest/services/gzly/gzly/MapServer',
					crossOrigin: 'anonymous'
				}),
				zIndex: 4,
				visible: true
			});
			this.map.addLayer(this.layers.ly_layer);
			//一级控制单元
			this.layers.one_layer = new TileLayer({
				source: new TileArcGISRest({
					url: this.mapServeIp+'/arcgis/rest/services/gzly/kzdy_onex/MapServer',
					crossOrigin: 'anonymous'
				}),
				zIndex: 5,
				visible: false
			});
			this.map.addLayer(this.layers.one_layer);
			//二级控制单元
			this.layers.two_layer = new TileLayer({
				source: new TileArcGISRest({
					url: this.mapServeIp+'/arcgis/rest/services/gzly/kzdy_twox/MapServer',
					crossOrigin: 'anonymous'
				}),
				zIndex: 5,
				visible: false
			});
			this.map.addLayer(this.layers.two_layer);
			//三级控制单元
			this.layers.three_layer = new TileLayer({
				source: new TileArcGISRest({
					url: this.mapServeIp+'/arcgis/rest/services/gzly/kzdy_threex/MapServer',
					crossOrigin: 'anonymous'
				}),
				zIndex: 5,
				visible: false
			});
			this.map.addLayer(this.layers.three_layer);

            this.layers.river_layer = new VectorLayer({
                source: new VectorSource(),
            });
            this.map.addLayer(this.layers.river_layer);
            this.layers.river_layer.setZIndex(5);

            this.layers.point_layer = new VectorLayer({
                source: new VectorSource(),
                renderMode: "vector",
                updateWhileInteracting: true,
                updateWhileAnimating: true
            });
            this.map.addLayer(this.layers.point_layer);
            this.layers.point_layer.setZIndex(100);

            this.layers.circle_layer = new VectorLayer({
                source: new VectorSource(),
                renderMode: "vector",
                updateWhileInteracting: true,
                updateWhileAnimating: true
            });
            this.map.addLayer(this.layers.circle_layer);
            this.layers.circle_layer.setZIndex(99);

            this.layers.test_layer = new VectorLayer({
                source: new VectorSource(),
                renderMode: "vector",
                updateWhileInteracting: true,
                updateWhileAnimating: true
            });
            this.map.addLayer(this.layers.test_layer);
            this.layers.test_layer.setZIndex(99);
		},
		//创建VectorLayer
		createVectorLayer(layer) {
			let vectorLayer = null;
			if (layer === 'temporary_layer') {
				vectorLayer = new VectorLayer({
					source: new VectorSource(), //设置渲染方式
					style: this.style,
					zIndex: 100
				});
			} else {
				vectorLayer = new VectorLayer({
					source: new VectorSource(), //设置渲染方式
					renderMode: "vector", //渲染方式为"vector"时，图层可以在交互时渲染
					updateWhileInteracting: true, //渲染方式为"ventor"时，图层可以在移动时渲染，可以解决地图移动结束以后点位图标才改变的情况
					updateWhileAnimating: true,
					zIndex: 100
				});
			}
			return vectorLayer
		},
		//查询点位
		queryPointInfo(point_array){
			//查询操作
			point_array.forEach((data) => {
				this.addPointer(data.long, data.lat, data, this.layers.point_layer);
			})
		},
		addPointer(x, y, attributes, layer) {
			// 确定图标
			let icon = getPointImg(attributes.nowwq, attributes.type);
			// 创建一个加点的图标并设置放置位置 【x,y】
			let point = new Feature({
				geometry: new Point([Number(x), Number(y)]),
				type: 'point'
			});
			// 设置Feature的样式，使用位置图标 this.normal
			point.setStyle(
				new Style({
					image: new Icon({
						src: icon,
						anchor: [0.5, 0.5], //锚点
						scale: 0.6,
					})
				})
			);
			point.setProperties(attributes);
			//设置点位id，这样可以用source.getFeatureById 找到
			// point.setId(this.getPoint_id(attributes));
			if (attributes !== null) {
				layer.getSource().addFeature(point);
			} else {
				layer.getSource().addFeature(undefined);
			}
			// console.log(layer.getSource().getFeatureById('2'))
		},
		// 点位点击事件
		onPointClick(feature) {
			let layer;
			const attributes = feature.getProperties();
			// 点击更改图标
			let icon = getPointImg(attributes.nowwq, attributes.type)
			// console.log(icon)
			//信息窗 attributes.geometry.flatCoordinates 点击位置的坐标
			// console.log(attributes)
			if (typeof attributes.layer !== 'undefined') {
				layer = this.layers.pointLayer;
			} else {
				layer = this.getPointLayer(attributes.type);
			}
			this.overlay.setPosition(attributes.geometry.flatCoordinates);
			this.point_id = this.getPoint_id(attributes); //信息弹框的id
			this.type = attributes.type; //信息弹框的类型
			// console.log(this.type)
			this.pointInfo = attributes; // 信息弹框的内容
			//高亮动画
			this.highLight(feature);
			// 更改图标
			feature.setStyle(
				new Style({
					image: new Icon({
						src: icon,
						anchor: [0.5, 0.5], //锚点
						scale: 0.6,
					}),
					zIndex: 110
				})
			);
			//设置清除上一个点（注意顺序）
			this.clearSelectByAttribute();
			this.selectedByAttriFeature = feature;
			//地图中心移动
			this.panToCoordinate(attributes.geometry.flatCoordinates, 16);
			// this.panTo(attributes.geometry.flatCoordinates[0],attributes.geometry.flatCoordinates[1])
			// 刷新图层（如果改变了图标,这一步是必要的）
			this.layers.pointLayer.getSource().refresh();
		},
		// 清除上一个选择的点位
		clearSelectByAttribute() {
			if (this.selectedByAttriFeature) {
				let value = this.selectedByAttriFeature.values_
				// console.log(this.selectedByAttriFeature,value)
				let icon = getPointImg(value.nowwq, value.type)
				let attributes = this.selectedByAttriFeature.getProperties();
				this.selectedByAttriFeature.getStyle().setImage(
					new Icon({
						src: icon,
						anchor: [0.5, 0.5], //锚点
						scale: 0.6,
					})
				);
				this.selectedByAttriFeature = null;
			}
			//刷新图层
			this.layers.pointLayer.getSource().refresh();

			// this.clickSelect.getOverlay().getSource().clear(); // 清除切换图层遗留的点位
		},
		// 根据点位id查找点位
		findPoint(id, type) {
			const feature = this.getPointLayer(type).getSource().getFeatureById(id);
			if (feature) {
				this.getPointLayer(type).setVisible(true)
				this.onPointClick(feature);
			} else {
				this.closeReturn()
				this.$message({
					message: "点位坐标经纬度不存在!",
					type: "error"
				});
			}
		},
		// 仅关闭点位窗口
		closeOverlay() {
			this.overlay.setPosition(undefined);
			this.clearSelectByAttribute();
		},
		// 关闭点位窗口并返回对应的缩放级别
		closeReturn(basiName) {
			this.overlay.setPosition(undefined);
			this.clearSelectByAttribute();
			this.centerCoordinate(basiName)
		},
		// 移动至coordinate
		panToCoordinate(coordinate, zoom) {
			this.map.getView().animate({
				center: coordinate,
				duration: 500,
				zoom: zoom
			});
		},
		// 移动至经纬度
		panTo(zoom) {
			this.map.getView().animate({
				zoom: zoom
			});
		},
		// 获取点位数据
		loadPoint() {
			this.testArr
				.forEach(point => {
					if (point.longitude !== '' && point.latitude !== '' && point.longitude !== '-' && point.latitude !== '-') {
						this.addPointer(point.longitude, point.latitude, point, this.getPointLayer(point.type));
					}

				});
		},
		// 地图点位高亮显示
		highLight(clickedFeature) {
			let type = clickedFeature.values_.type
			// console.log(type)
			const duration = 2000;
			let start = new Date().getTime();
			let highLightedFeature;
			//点击事件传入点击的feature，首先与上一个点对比，如果是同一个点，则不执行
			if (clickedFeature === this.selectedByAttriFeature) {
				return;
			}
			const layers = this.getPointLayer(type)
			const listenerKey = layers.on('postrender', (event) => {
				const feature = this.selectedByAttriFeature;
				//如果当前没有点选的点位，则取消事件
				if (!feature) {
					unByKey(listenerKey);
					return;
				}
				//如果点选了其他点位，则取消事件
				if (highLightedFeature && highLightedFeature !== feature) {
					unByKey(listenerKey);
					return;
				}
				if (!highLightedFeature) {
					highLightedFeature = feature;
				}
				//style生成
				const vectorContext = getVectorContext(event);
				const frameState = event.frameState;
				const flashGeom = feature.getGeometry().clone();
				const elapsed = frameState.time - start;
				const elapsedRatio = elapsed / duration;
				// radius will be 5 at start and 30 at end.
				const radius = easeOut(elapsedRatio) * 25 + 5;
				const opacity = easeOut(1 - elapsedRatio);
				const style = new Style({
					image: new Circle({
						radius: radius,
						stroke: new Stroke({
							color: 'rgba(255, 0, 0, ' + opacity + ')',
							width: 0.25 + opacity
						}),
						fill: new Fill({
							color: 'rgba(255, 0, 0, ' + (opacity / 3) + ')',
						})
					})
				});
				vectorContext.setStyle(style);
				vectorContext.drawGeometry(flashGeom);
				//设置重复运行
				if (elapsed > duration) {
					start = new Date().getTime();
				}
				this.map.render();
			});
		},
		// 点击触发河流图层
		getRiverLayer(name) {
			this.layers.zhl_layer.setVisible(false);
			this.$children[2].layers.zhl_layer = false;
			this.drawRiverLayer(name);
		},
		// 添加河流图层
		drawRiverLayer(name,type,fw) {
			this.layers.river_layer.getSource().clear();
			let _this = this;
			//读取河流数据
			this.axios({
				method: 'get',
				url: this.mapServeIp+'/arcgis/rest/services/gzly/zyhl/MapServer/0/query',
				params: {
					f: 'json',
					where: "河流湖库 like '%" + name + "%'",
					returnGeometry: true,
					outFields: '河流湖库',
				}
			}).then(function(response) {
				try {
                    let features = new EsriJSON().readFeatures(response.data);
                    let center = [];
                    center.push(features[0].getGeometry().flatCoordinates[0]);
                    center.push(features[0].getGeometry().flatCoordinates[1]);
                    _this.panToCoordinate(center,8);
                    features.forEach((feature)=>{
                        feature.setStyle(new Style({
                            stroke: new Stroke({
                                color: '#0099ff',
                                // color: 'rgba(255,0,0,0.6)',
                                width: 2
                            }),
                            fill: new Fill({
                                color: "rgba(255,0,0,0.2)"
                            })
                            // text: new Text({
                            // 	font: '12px sans-serif',
                            // 	placement: 'line',
                            // 	text: features.get('河流湖库'),
                            // 	fill: new Fill({
                            // 		color: '#28CCFD'
                            // 	})
                            // })
                        }));
                    });
                    _this.layers.river_layer.getSource().addFeatures(features);
                    if(type === '河道周边分析'){
                        _this.drawRiverExpansLayer(fw);
					}
				} catch (e) {
					console.log(e);
				}
			}).catch(function(error) {
				console.log(error);
			});
		},
		//绘制河流并扩充
        drawRiverExpansLayer(fw){
            this.layers.circle_layer.getSource().clear();
            const features = this.layers.river_layer.getSource().getFeatures();//重新获取图层上的Features
			// let new_flatCoordinates = [];
            // features.forEach((data) => {
            //     let flatCoordinates_array = data.getGeometry().flatCoordinates;
            //     new_flatCoordinates = new Array(...new_flatCoordinates,...flatCoordinates_array);
            // });
            // features[0].getGeometry().flatCoordinates = new_flatCoordinates;
            try{
                let parser = new jsts.io.OL3Parser();
                parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
                features.forEach((feature)=>{
                    let jstsGeom = parser.read(feature.getGeometry());
                    let buffered = jstsGeom.buffer(Number(fw)/100);
                    feature.setGeometry(parser.write(buffered));
                });
                this.layers.circle_layer.getSource().addFeatures(features);
                //加载河道区域内的所有点位
                this.queryCirclePoint();
            }catch (e) {
                console.log(e);
            }
		},
		//点击地图后设置标注
		addTaggPoint(coordinate){
            this.layers.circle_layer.getSource().clear();
            // 创建一个加点的图标并设置放置位置 【x,y】
            let point = new Feature({
                geometry: new Point([Number(coordinate[0]), Number(coordinate[1])]),
                type: 'point'
            });
            // 设置Feature的样式，使用位置图标 this.normal
            point.setStyle(
                new Style({
                    image: new Icon({
                        src: require('../assets/bz.png'),
                        anchor: [0.5, 0.5], //锚点
                        scale: 0.6,
                    })
                })
            );
			this.layers.circle_layer.getSource().addFeature(point);
		},
		//根据中心点与半径画圆
        drawCircle(coordinate,radius){
            let _self = this;
            radius = Number(radius) * 1000;
            this.layers.circle_layer.getSource().clear();
            let circleIn3857 = new Circle(_self.coordinateTransform(coordinate, 'EPSG:4326', 'EPSG:3857'), radius);
            let circleIn4326 = circleIn3857.transform('EPSG:3857', 'EPSG:4326');
            let circleFeature = new Feature({ //路线
                geometry: circleIn4326,
            });
            circleFeature.setStyle(
                new Style({
                    stroke: new Stroke({
                        color: "red",
                        width: 2
                    }),
                    fill: new Fill({
                        color: "rgba(255,0,0,0.2)"
                    })
                })
            );
            //设置中心位置
			let center = [circleFeature.getGeometry().flatCoordinates[0], circleFeature.getGeometry().flatCoordinates[1]];
            this.panToCoordinate(center,12);
            //将所有矢量图层添加进去
            this.layers.circle_layer.getSource().addFeature(circleFeature);
            //加载圆内点位数据
			this.queryCirclePoint();
		},
        queryCirclePoint(){
            let _this = this;
            this.layers.point_layer.getSource().clear();
            let features = this.layers.circle_layer.getSource().getFeatures(),
                geometry = null;
            features.forEach((feature) => {
                geometry = feature.getGeometry();
                _this.points.forEach((data) => {
                    let coordinate = [data.long,data.lat];
                    if(geometry.intersectsCoordinate(coordinate)){
                        _this.addPointer(data.long,data.lat,data,this.layers.point_layer);
                    }
                })
            });
		},
		//中心点坐标转换
        coordinateTransform(coord, coordinate1, coordinate2){
            let result = transform(coord, coordinate1, coordinate2);
            return result;
        },
		//绘制控制单元
        drawRiverUnitOne(name){
            this.layers.circle_layer.getSource().clear();
            let _this = this;
            //读取河流数据
            this.axios({
                method: 'get',
                url: this.mapServeIp+'/arcgis/rest/services/gzly/kzdy1/MapServer/0/query',
                params: {
                    f: 'json',
                    where: "一级单元_1 = '"+name+"'",
                    returnGeometry: true,
                    outFields: '一级单元_1',
                }
            }).then(function(response) {
                try {
                    let features = new EsriJSON().readFeatures(response.data);
                    let extent = features[0].getGeometry().getExtent();
                    _this.panToCoordinate(getCenter(extent),9);
                    features.forEach((feature)=>{
                        feature.setStyle(new Style({
                            stroke: new Stroke({
                                color: 'rgba(255,0,0,0.6)',
                                width: 5
                            }),
                            fill: new Fill({
                                color: "rgba(255,0,0,0.2)"
                            })
                            // text: new Text({
                            // 	font: '12px sans-serif',
                            // 	placement: 'line',
                            // 	text: features.get('河流湖库'),
                            // 	fill: new Fill({
                            // 		color: '#28CCFD'
                            // 	})
                            // })
                        }));
                    });
                    _this.layers.circle_layer.getSource().addFeatures(features);
                    _this.queryCirclePoint();
                } catch (e) {
                    console.log(e);
                }
            }).catch(function(error) {
                console.log(error);
            });
		},
        formatPoints(){
			for(let i = 0 ; i < 200 ; i++){
                let _point = {};
                _point.long = this.random(104,109);
                _point.lat = this.random(24,28);
                _point.nowwq = '';
                _point.type = '污染源';
                this.points.push(_point);
			}
		},
        random(lower, upper) {
            return (Math.random() * (upper - lower)) + lower;
        }
	},
    mounted(){
		this.formatPoints();
		let a = 2, b = 1;
	}
};
