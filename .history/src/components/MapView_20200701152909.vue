<template>

  <!--地图div-->
  <div id="map" ref="rootmap">

    <!--按钮组-->
    <div class="button-row">
      <button @click="onButton1Click">添加点位</button>
      <button @click="onButton2Click">添加随机点位</button>
      <button @click="onButton3Click">渲染盘龙江</button>
      <button @click="onButton4Click">渲染湖体等浓度</button>
      <button @click="onButton5Click">模拟点击站点列表：点位名称7</button>
      <button @click="onButton6Click">导出PNG</button>
      <button @click="onButton7Click">添加滇池流域图层</button>
      <button @click="onButton8Click">改变选中点的图标</button>
      <button @click="onButton9Click">添加多个overlay</button>
      <br>
      <button @click="onButton10Click">按权重的热力图(heatmap)</button>
      <button @click="onButton11Click">按密度的热力图(cluster+heatmap)</button>
      <button @click="onButton12Click">添加昆明区县边界</button>
      <button @click="onButton13Click">添加云南省边界</button>
      <button @click="onButton14Click">添加网格</button>
      <button @click="onButton15Click">添加特定点位</button>
      <button @click="onButton16Click">添加视频点位</button>
      <button @click="onButton17Click">添加所有河道渲染</button>

      <br>
      <button @click="onButton18Click">三线一单图层</button>
      <button @click="onButton19Click">YS5206023210001</button>

    </div>

    <!--标绘工具按钮组-->
    <div class="button-row" style="margin-top: 50px;">
      <plot-function :map="map"></plot-function>
    </div>

    <!--地图信息窗口html-->
    <div class="overlay-container">
      <div id="overlay" class="ol-popup">
        <a class="ol-popup-closer" @click="closeOverlay"></a>
        <div id="overlay-content">{{overlayContent}}</div>
      </div>
    </div>


    <div class="overlay-container">
      <div id="overlay-test" class="ol-popup">
        <a class="ol-popup-closer" @click="closeOverlay"></a>
        <div id="overlay-test-content"></div>
      </div>
    </div>
  </div>
</template>

<script>

  //ol组件，按需引用
  import "ol/ol.css";
  import {Map, Feature, View, Overlay, Graticule} from "ol";
  import {Point} from "ol/geom";
  import {Vector as VectorSource, OSM, XYZ, TileArcGISRest, TileWMS, Cluster, ImageArcGISRest} from "ol/source";
  import {Tile as TileLayer, Vector as VectorLayer, Heatmap as HeatmapLayer} from "ol/layer";
  import {Circle, Fill, Stroke, Style, Text, Icon} from "ol/style";
  // import {RenderFunction} from "ol/style/Style";
  import {click, pointerMove, altKeyOnly} from 'ol/events/condition';
  import {Select, Draw} from 'ol/interaction';
  import {defaults as defaultControls, ScaleLine} from 'ol/control';
  import GeoJSON from 'ol/format/GeoJSON.js';
  import EsriJSON from 'ol/format/EsriJSON.js';
  import {easeOut} from 'ol/easing';
  import {unByKey} from 'ol/Observable';

  import OSMXML from 'ol/format/OSMXML';
  import {transformExtent} from 'ol/proj';
  import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';

  //proj4
  import {register} from 'ol/proj/proj4';
  import proj4 from 'proj4';
  import Projection from 'ol/proj/Projection.js';
  import {tile as tileStrategy} from 'ol/loadingstrategy';
  import {createXYZ} from 'ol/tilegrid';
  import $ from "jquery"

  //plot functions
  import PlotFunction from "./PlotFunction";

  //模拟数据
  import hl from '../json/hl';
  import pljData from '../json/plj';
  import contourData from '../json/contour';
  import pointsData from '../json/points';
  import kmgeojson from "../json/kmgeojson";
  import yngeojson from "../json/yunnan";
  import grid20 from "../json/五区1km";
  import video_points from "../json/video_points";


  export default {
    name: "MapView",
    mounted (){
      this.initMap();
    },
    components: {
      PlotFunction
    },
    data(){
      return {
        map: null,
        center: [102.71770477294923, 24.875450134277344],
        overlay: null,
        overlayContent: "",
        pointImage:{
          normal: require("../assets/point_normal.png"),
          selected: require("../assets/point_selected.png"),
        },
        layers: {
          pointLayer: null,
          riverLayer: null,
          contourLayer: null,
          drawLayer: null
        },
        selectedFeature: null,
        //plot
        plotFunctions: null,
        //graticule
        graticule: null,
      }
    },
    methods: {

      /***
       * 初始化地图
       */
      initMap () {

        this.map = new Map({
          //地图div id
          target: "map",
          //图层，可以添加多个，也可以之后再添加
          //crossOrigin: 'anonymous' 为跨域地图的处理，不然canvas不能导出图片
          layers: [
            //街景地图
            new TileLayer({
              source: new OSM(),
              crossOrigin: 'anonymous'
            }),
            //XYZ地图
            // new TileLayer({
            //   source: new XYZ({
            //     // url: 'https://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=ce70a52426fabd6c2062fdd14c3426d2',
            //     url: 'http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=ce70a52426fabd6c2062fdd14c3426d2',
            //     crossOrigin: 'anonymous'
            //   })
            // }),
            // new TileLayer({
            //   source: new XYZ({
            //     url: 'http://t1.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=469cfd9c133f30baaf3f94a9cd848c47',
            //     crossOrigin: 'anonymous'
            //   })
            // }),
            //切片影像图
            // new TileLayer({
            //   source: new TileWMS({
            //     url: 'https://ahocevar.com/geoserver/wms',
            //     params: {
            //       'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
            //     },
            //     crossOrigin: 'anonymous'
            //   })
            // }),
            //滇池流域矢量图（Arcgis地图）
            // new TileLayer({
            //   source: new TileArcGISRest({
            //     url: "http://192.168.2.21:6080/arcgis/rest/services/dcly_hlm/MapServer",
            //         crossOrigin: 'anonymous'
            //   }),
            // }),
            //影像（Arcgis地图）
            // new TileLayer({
            //   source: new TileArcGISRest({
            //     url: "https://elevation3d.arcgis.com/arcgis/rest/services/World_Imagery/MapServer"
            //   }),
            // }),
          ],
          //视图，这里设置坐标系
          view: new View({
            center: [106.42, 26.35],
            zoom: 10,
            projection: 'EPSG:4326'
            // projection: projection
          }),
          //控制组件：比例尺
          // controls: defaultControls().extend([
          //   new ScaleLine()
          // ])
          controls: []
        });
        this.map.addControl(new control.ScaleLine());//添加比例尺

        //添加点位图层
        this.layers.pointLayer = new VectorLayer({
          source: new VectorSource(),
          //设置渲染方式
          renderMode: "vector",
          //渲染方式为"vector"时，图层可以在交互时渲染
          updateWhileInteracting: true,
          //渲染方式为"ventor"时，图层可以在移动时渲染，可以解决地图移动结束以后点位图标才改变的情况
          updateWhileAnimating: true
        });
        this.map.addLayer(this.layers.pointLayer);
        this.layers.pointLayer.setZIndex(200);

        //初始化信息窗口（点位窗）
        this.overlay = new Overlay({
          element: document.getElementById("overlay"),
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          },
          offset: [0, -30]
        });
        this.map.addOverlay(this.overlay);

        //添加河流渲染图层
        this.layers.riverLayer = new VectorLayer({
          source: new VectorSource(),
          style: new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 2,
            })
          })
        });
        this.layers.riverLayer.setZIndex(99);
        this.map.addLayer(this.layers.riverLayer);


        //等浓度图层
        this.layers.contourLayer = new VectorLayer({
          source: new VectorSource()
        });
        this.layers.contourLayer.setZIndex(98);
        this.map.addLayer(this.layers.contourLayer);


        //地图交互事件，区分于map.on()，可以指定特定图层监听
        //鼠标移入
        const pointerMoveSelect = new Select({
          condition: pointerMove,
          layers: [
            this.layers.pointLayer,
            this.layers.riverLayer
          ]
        });
        pointerMoveSelect.on('select', (e)=> {
          //do something
          const features = e.selected;
          const desFeatures = e.deselected;

          //添加文字标注
          features.forEach((feature)=>{
            if(feature.get("name")){
              feature.getStyle().setText(new Text({
                text: feature.get("name"),
                offsetX: 0,
                offsetY: 12,
                fill: new Fill({
                  color: 'blue'
                }),
                font: '14px sans-serif',
                overflow: true,
              }));
            }
          });
          //去除文字标注
          desFeatures.forEach((desFeature)=>{
            desFeature.getStyle().setText(undefined)
          })
        });
        this.map.addInteraction(pointerMoveSelect);


        //点击
        const clickSelect = new Select({
          condition: click,
          layers: [
            this.layers.pointLayer
          ]
        });
        clickSelect.on('select', (e)=> {
          const features = e.selected;

          features.forEach((feature)=>{
            if(feature === this.selectedByAttriFeature){
              return;
            }
            this.onPointClick(feature, feature.getProperties().geometry.flatCoordinates)
          });
        });
        clickSelect.on('deselect', (e)=> {
          console.log(e);
        });
        this.map.addInteraction(clickSelect);

        this.map.on("click", this.onMapClick);
      },


      /***
       * 加点
       * @param x: string/float
       * @param y: string/float
       * @param attributes: object
       *
       * 当点位数量较多的时候，需要使用 layer.addFeatures(pointsArray) 进行批量加点。
       */
      addPoint(x, y, attributes){
        const point = new Feature({
          geometry: new Point([x, y]),
          type: "point"
        });
        point.setStyle(new Style({
          image: new Icon({
            src: this.pointImage.normal,
            anchor: [0.5, 0.5]  //锚点
          }),
          zIndex: 110,
        }));
        point.setProperties(attributes);
        //设置点位id，这样可以用source.getFeatureById 找到
        point.setId(attributes.id);

        this.layers.pointLayer.getSource().addFeature(point);
      },

      /***
       * 点位点击事件
       * @param feature
       */
      onPointClick(feature){
        const attributes = feature.getProperties();
        //信息窗
        this.overlay.setPosition(attributes.geometry.flatCoordinates);
        this.overlayContent = attributes.name;
        //高亮动画
        this.highLight(feature);
        //更改图标
        feature.getStyle().setImage(new Icon({
          src: this.pointImage.selected,
          anchor: [0.5, 0.5]  //锚点
        }));

        //设置清除上一个点（注意顺序）
        this.clearSelectByAttribute();
        this.selectedByAttriFeature = feature;
        //地图中心移动
        this.panToCoordinate(attributes.geometry.flatCoordinates);
        //刷新图层（如果改变了图标，这一步是必要的）
        this.layers.pointLayer.getSource().refresh();
      },

      /***
       * 清除上一个选择的点位
       */
      clearSelectByAttribute(){
        if(this.selectedByAttriFeature){
          this.selectedByAttriFeature.getStyle().setImage(new Icon({
            src: this.pointImage.normal,
            anchor: [0.5, 0.5]  //锚点
          }));
          this.selectedByAttriFeature = null;
        }
        //刷新图层
        this.layers.pointLayer.getSource().refresh();
      },

      /***
       * 移动至经纬度
       */
      panTo(longitude, latitude){
        this.map.getView().animate({
          center: [longitude, latitude],
          duration: 500
        });
      },

      /***
       * 移动至coordinate
       */
      panToCoordinate(coordinate){
        this.map.getView().animate({
          center: coordinate,
          duration: 500
        });
      },

      /**
       * 关闭点位窗口
       * */
      closeOverlay(){
        const interactions = this.map.getInteractions();
        console.log(interactions);

        this.overlay.setPosition(undefined);
        this.clearSelectByAttribute();
      },


      /***
       * 绘制河流（盘龙江）
       * 使用的是esri json，所以需要引入的EsriJSON().readFeatures()
       * 另外这里使用的是静态数据
       * 动态json的话，官方例子使用的是直接使用ajax请求完整的url
       */
      drawRiver(){
        //读取河流数据
        const esriJson = pljData;
        try{
          const features = new EsriJSON().readFeatures(esriJson);
          features.forEach((feature)=>{
            feature.set("name", "盘龙江");
            feature.setStyle(new Style({
              stroke: new Stroke({
                color: 'blue',
                width: 2
              })
            }));
          });
          this.layers.riverLayer.getSource().addFeatures(features);
        }catch (e) {
          console.log(e);
        }
      },

      /***
       * 绘制等浓度图层，基本与河流类似
       *
       * 请求contour的服务，分为草海(ch)外海(wh)两个区域分开渲染
        axios.post(
           "http://182.16.1.167:10080/api/v2/spatialdb/dc/ch/0/contour",
           //"http://182.16.1.167:10080/api/v2/spatialdb/dc/wh/0/contour",
           {
             latitudes, //经度数组
             longitudes,  //纬度数组
             measuredValues, //插值的数组
             targetValues   //浓度区间的数组
           }
          ).then(res => {
              let features = new GeoJSON().readFeatures(res.data);
          });
       *
       */
      drawContour(){
        //读取等浓度数据
        const geoJson = contourData;
        const features = new GeoJSON().readFeatures(geoJson);
        // contourLayer.getSource().addFeatures(features); 这样不会有样式
        features.forEach((feature)=>{
          const value = feature.get("value");
          const color = 'rgb(0,0,'+ (value*100) +')';
          feature.setStyle(new Style({
            fill: new Fill({
              color: color
            })
          }));
          this.layers.contourLayer.getSource().addFeature(feature);
        })
      },


      /***
       * 点位添加波纹
       * 动画效果会覆盖原有的点位图标，设置zIndex没用
       * API原文：
       * Note that since this is an immediate rendering API, any zIndex on the provided style will be ignored.
       */
      highLight(clickedFeature){

        const duration = 2000;
        let start = new Date().getTime();
        let highLightedFeature;

        //点击事件传入点击的feature，首先与上一个点对比，如果是同一个点，则不执行
        if(clickedFeature === this.selectedByAttriFeature){
          return;
        }

        const listenerKey = this.map.on('postcompose', (event)=>{
          const feature = this.selectedByAttriFeature;
          //如果当前没有点选的点位，则取消事件
          if(!feature){
            unByKey(listenerKey);
            return;
          }
          //如果点选了其他点位，则取消事件
          if(highLightedFeature && highLightedFeature!==feature){
            unByKey(listenerKey);
            return;
          }
          if(!highLightedFeature){
            highLightedFeature = feature;
          }

          //style生成
          const flashGeom = feature.getGeometry().clone();
          const elapsed = event.frameState.time - start;
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
                color: 'rgba(255, 0, 0, ' + (opacity/3) + ')',
              })
            })
          });
          event.vectorContext.setStyle(style);
          event.vectorContext.drawGeometry(flashGeom);
          //设置重复运行
          if (elapsed > duration) {
            start = new Date().getTime();
          }
          this.map.render();
        });
      },


      /***
       * 根据站点ID查找点位并点击
       * @param id
       */
      findPoint(id){
        const feature = this.layers.pointLayer.getSource().getFeatureById(id);
        if(feature){
          this.onPointClick(feature);
        }
      },

      /***
       * 导出PNG图片
       * IE/EDGE使用浏览器自带的msSaveBlob
       * 其他使用A标签模拟点击下载效果
       *
       * 注意：点位窗口和文本框无法导出，如果需要，可以使用Html2Canvas插件
       */
      exportPNG(){
        this.map.once('rendercomplete', function(event) {
          const canvas = event.context.canvas;
          //微软系
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
          }
          //其他
          else {
            canvas.toBlob(function(blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "MAP_" + new Date().getTime() + ".png";
              link.style.display = "none";
              document.body.appendChild(link);
              link.click();
              link.remove();
            });
          }
        });
        this.map.renderSync();
      },

      /*测试按钮事件*/

      /***
       * 循环加点位
       */
      onButton1Click(){
        pointsData.forEach((point)=>{
          this.addPoint(point.longa, point.lati, {
            name: point.mc,
            id: point.objectid
          })
        });
      },
      /***
       * 添加随机点位
       */
      onButton2Click(){
        const x = this.center[0] + ( Math.random() - 0.5 );
        const y = this.center[1] + ( Math.random() - 0.5 );
        this.addPoint(x, y, {
          name: "point",
          timestamp: new Date().getTime()
        })
      },
      /***
       * 绘制盘龙江
       * 使用esriJSON数据渲染矢量图形(PolyLine)
       */
      onButton3Click(){
        this.drawRiver()
      },
      /***
       * 绘制滇池外海等浓度图
       * 使用GeoJSON数据渲染面
       */
      onButton4Click(){
        this.drawContour()
      },
      /***
       * 选中id为7的点位，模拟列表点击操作
       */
      onButton5Click(){
        this.findPoint(7);
      },
      /***
       * 导出为图片
       */
      onButton6Click(){
        this.exportPNG();
      },
      /***
       * 加载arcgis切片图层，使用本地部署的地图服务
       */
      onButton7Click(){
        //注释部分是尝试以矢量的形式加载，而不是切片
        // var vectorSource = new VectorSource({
        //     url: "http://192.168.2.21:6080/arcgis/rest/services/dcly_hlm/MapServer",
          //   loader: (extent, resolution, projection)=> {
          //     console.log(extent);
          //     var url = "http://192.168.2.21:6080/arcgis/rest/services/sxydtc/MapServer/" + 2 + '/query/?f=json&' +
          //       'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
          //       encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
          //         extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
          //         ',"spatialReference":{"wkid":4490}}') +
          //       '&geometryType=esriGeometryEnvelope&inSR=4490&outFields=*' +
          //       '&outSR=4326';
          //
          //     $.ajax({
          //       url: url,
          //       dataType: 'jsonp',
          //       success: function (response) {
          //         var features = new EsriJSON().readFeatures(response, {
          //           featureProjection: projection
          //         });
          //         vectorSource.addFeatures(features)
          //       }
          //     })
          //   },
          //   strategy: tileStrategy(createXYZ({
          //     tileSize: 1024
          //   }))
          // });
        // const layer = new VectorLayer({
        //   source:vectorSource
        // });
        // console.log(layer);
        const layer = new TileLayer({
          source: new TileArcGISRest({
            url: "http://192.168.2.21:6080/arcgis/rest/services/dcly_hlm/MapServer"
          }),
          zIndex: 2
        });
        this.map.addLayer(layer);
      },
      /***
       * 切换点位的选中状态，如果没有选中，那么选中id为7的
       */
      onButton8Click(){
        if(this.selectedByAttriFeature){
          this.selectedByAttriFeature.getStyle().setImage(null);
          this.selectedByAttriFeature.getStyle().setImage(new Icon({
            src: this.pointImage.normal,
            anchor: [0.5, 0.5]  //锚点
          }));
          this.selectedByAttriFeature = null;
        }else{
          /*const features = this.layers.pointLayer.getSource().getFeatures();
          features.forEach((feature)=>{
            if(feature.get("id") == 7){
              feature.getStyle().setImage(null);
              feature.getStyle().setImage(new Icon({
                src: this.pointImage.selected,
                anchor: [0.5, 0.5]  //锚点
              }));
              this.selectedByAttriFeature = feature;
            }
          });*/
          const feature = this.layers.pointLayer.getSource().getFeatureById(7);
          if(feature){
            feature.getStyle().setImage(null);
            feature.getStyle().setImage(new Icon({
              src: this.pointImage.selected,
              anchor: [0.5, 0.5]  //锚点
            }));
            this.selectedByAttriFeature = feature;
          }
        }
        this.layers.pointLayer.getSource().refresh();
      },
      /***
       * 生成多个overlay
       */
      onButton9Click(){
        let array = [
          {"objectid":1, "longitude": 102.7882, "latitude": 24.8958, "mc": "点位名称1"},
          {"objectid":2, "longitude": 102.6385, "latitude": 24.9899, "mc": "点位名称2"},
          {"objectid":3, "longitude": 102.6605, "latitude": 24.9349, "mc": "点位名称3"},
          {"objectid":4, "longitude": 102.6481, "latitude": 24.8141, "mc": "点位名称4"},
          {"objectid":5, "longitude": 102.6038, "latitude": 24.6987, "mc": "点位名称5"},
          {"objectid":6, "longitude": 102.7099, "latitude": 24.6754, "mc": "点位名称6"},
          {"objectid":7, "longitude": 102.7072, "latitude": 24.7262, "mc": "点位名称7"}
        ];
        //遍历数据 生成多个overlay
        array.forEach((item)=>{

          //生成内容HTML元素
          let el = document.createElement("div");
          el.innerHTML = `<div id="overlay-test" class="ol-popup" style="background: white">
                            <a class="ol-popup-closer" @click="closeOverlay"></a>
                            <div id="overlay-test-content">${item.mc}</div>
                          </div>`;

          //创建overlay
          let overlay = new Overlay({
            element: el,
            autoPan: true,
            autoPanAnimation: {
              duration: 250
            },
            offset: [-30, 5]
          });
          this.map.addOverlay(overlay);
          overlay.setPosition([item.longitude, item.latitude])
        });
      },
      /***
       * 根据json数据生成热力图，权重由value计算
       */
      onButton10Click(){
        let points = [
          {"objectid":1, "longitude": 102.7882, "latitude": 24.8958, "value": 28.6},
          {"objectid":2, "longitude": 102.6385, "latitude": 24.9899, "value": 11.5},
          {"objectid":3, "longitude": 102.6605, "latitude": 24.9349, "value": 9},
          {"objectid":4, "longitude": 102.6481, "latitude": 24.8141, "value": 16.1},
          {"objectid":5, "longitude": 102.6038, "latitude": 24.6987, "value": 15.9},
          {"objectid":6, "longitude": 102.7099, "latitude": 24.6754, "value": 24.2},
          {"objectid":7, "longitude": 102.7072, "latitude": 24.7262, "value": 11.5}
        ];

        let heatmapLayer = new HeatmapLayer({
          source: new VectorSource(),
          blur: 50,      //扩散幅度 为0 的时候就显示单个点
          radius: 50,     //半径大小
          shadow: 250,    //点位阴影 和blur有区别
          opacity: 1,     //透明度
          // extent: null,   //范围限制 传入extent参数应该可以把热力图限制在一个方形范围内
          gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],   //渐变颜色
          weight: 'weight'    //值在feature中的字段名，应该要处理数据在0-1之间， >1的会限制在1
        });

        points.forEach((point)=>{
          let point_weight = 1;   //处理点位值，以1为基准，

          //正常加feature 输入经纬度
          let feature = new Feature({
            geometry: new Point([point.longitude, point.latitude])
          });
          //添加点位对应的weight 权重
          feature.set("weight", point.value/20);   //weight 和HeatmapLayer中设置的'weight'对应
          heatmapLayer.getSource().addFeature(feature);
        });

        this.map.addLayer(heatmapLayer);
      },
      /***
       * 根据json数据生成热力图，权重由密集程度计算，使用cluster 配合heatmap
       */
      onButton11Click(){
        //模拟数据（铜仁污染源）
        let points = [["108.909356","27.300191",1],["109.059182","27.398575",1],["109.185385","27.7282",1],["109.3471","27.776117",2],["109.1839","27.7039",1],["109.282963","27.752364",2],["109.2494","27.7141",1],["109.284565","27.748091",2],["109.282963","27.752364",2],["109.328978","27.81461",2],["109.22146","27.72468",1],["109.229138","27.520768",2],["109.23547","27.522953",2],["109.235829","27.522725",2],["109.234113","27.523213",1],["108.268225","27.895749",2],["108.253646","27.912111",1],["108.256836","27.9545",2],["108.239739","27.527976",1],["108.230294","27.510311",2],["108.230294","27.510311",2],["108.238359","27.544323",1],["108.28368","27.963978",1],["108.233759","27.942845",1],["108.255463","27.933054",1],["108.146268","27.751036",1],["108.264222","27.865473",1],["108.267633","27.884322",1],["108.193255","27.745029",1],["108.110492","28.287925",2],["108.102717","28.285702",2],["108.244754","28.18922",1],["108.126346","28.265075",2],["108.097947","28.275499",2],["108.466857","28.492811",1],["108.500607","28.566907",2],["108.362258","28.558219",2],["109.196278","28.182505",1],["109.207404","28.18511",1],["109.200794","28.188692",1],["107.931447","27.545325",1],["108.342795","27.531081",1],["109.009766","27.31214",2],["109.205141","28.163363",1],["109.182849","27.515285",2],["109.172478","27.516696",2],["109.189188","27.496036",2],["109.233772","27.520347",2],["109.232961","27.524154",2],["109.229138","27.520768",2],["109.167485","27.472877",2],["109.342823","27.56016",1],["109.201197","27.525417",1],["109.237673","27.522395",2],["109.188631","27.496167",2],["109.14856","27.590657",2],["109.233537","27.524346",2],["109.218751","27.535944",2],["109.23652","27.52251",1],["108.260686","27.952764",1],["108.695237","28.092926",2],["108.69528","28.08477",2],["108.401795","28.000138",1],["108.364113","27.989459",2],["108.364113","27.989459",2],["108.393219","27.980779",2],["108.390545","27.980571",1],["108.568439","28.116589",2],["108.760888","28.116762",2],["108.468121","27.996552",1],["108.389448","27.989201",1],["108.115724","28.281249",2],["108.950164","28.000011",2],["109.188415","28.176471",2],["109.213251","28.176141",1],["109.207136","28.209399",1],["108.888116","28.207085",1],["109.207136","28.209399",2],["109.233641","28.169389",2],["109.230664","28.177725",1],["108.803393","28.095487",1],["109.211037","28.18502",1],["109.225594","28.173229",1],["108.952834","27.555654",2],["109.167682","27.472727",2],["108.84068","27.697378",2],["108.836923","27.698844",1],["108.826273","27.67191",1],["108.858734","27.716128",1],["108.826068","27.672558",1],["108.833745","27.686028",2],["108.940235","27.244855",1],["108.926521","27.240714",2],["108.951827","27.251194",1],["108.953157","27.251483",1],["108.874395","27.226991",1],["108.111871","28.286687",2],["108.111446","28.289556",2],["109.226986","28.168761",2],["109.012763","27.308302",2],["109.000044","27.30391",2],["109.017285","27.325435",1],["109.035612","27.296341",1],["109.005216","27.309017",2],["109.038561","27.296947",1],["109.007647","27.313709",2],["109.014815","27.297706",2],["109.015963","27.301394",1],["108.87279","27.202369",1],["108.951471","27.250613",2],["108.926521","27.240714",2],["108.880338","27.221656",1],["109.113385","27.494515",2],["108.94477","27.350661",2],["108.946681","27.246608",2],["108.911938","27.234674",1],["109.232651","27.52326",2],["108.836342","27.234941",2],["108.94467","27.246608",2],["108.949025","27.30173",2],["109.135437","27.473135",2],["108.234199","27.509214",2],["108.187975","27.585972",1],["109.023514","27.296368",1],["109.00824","27.291971",2],["109.019128","27.33896",2],["109.297767","27.889289",2],["109.273848","27.839715",2],["109.26597","27.845596",2],["109.293175","27.767097",1],["109.19988","27.727373",1],["109.274708","27.730023",2],["109.282421","27.742138",1],["109.3471","27.776117",2],["107.928249","27.547215",1],["107.943017","27.551827",1],["108.240526","27.528753",2],["108.308555","27.554242",2],["108.479829","27.58268",2],["108.384546","27.429567",2],["108.253437","27.53548",2],["107.873311","27.490791",2],["108.462421","27.526654",2],["108.932407","28.058293",1],["109.194718","27.712996",2],["108.237727","27.530795",1],["108.50783","28.586697",1],["109.232401","28.1958",2],["108.700158","28.089423",2],["108.087191","28.273255",1],["109.270173","27.736104",2],["109.258974","27.733201",2],["109.159609","27.609713",2],["108.269241","27.96356",2],["108.230974","27.68953",2],["108.334661","27.650051",2],["107.97813","27.527417",2],["108.242251","27.534776",1],["108.259575","27.5373",2],["109.173916","27.671134",1],["108.233255","27.593295",1],["108.258425","27.540375",1],["109.00786","27.305437",2],["108.221667","27.576111",1],["109.037778","27.338056",2],["108.103333","28.270833",2],["109.012763","27.308302",2],["108.0869","28.2725",2],["109.027591","27.299581",2],["109.275817","27.848973",1],["109.2591","27.73333",1],["109.2452","27.73222",1],["108.1172","28.2794",1],["108.1172","28.2794",2],["109.252","27.775",2],["108.6669","28.07277",1],["109.147533","27.717235",2],["108.8697","27.2202",2],["108.83692","27.69884",2],["108.3858","27.99666",1],["108.6669","28.0727",1],["108.1177","28.2793",1],["109.12496","27.4094",1],["108.91568","27.279644",1],["108.848559","27.736365",1],["108.839791","27.253441",1],["109.098276","27.398575",1]];

        let clusterLayer = new HeatmapLayer({ //heatmap
          source: new Cluster({     //cluster
            source: new VectorSource()    //vector source
          }),
          blur: 30,      //扩散幅度 为0 的时候就显示单个点
          radius: 25,     //半径大小
          shadow: 250,    //点位阴影 和blur有区别
        });

        points.forEach((point)=>{
          //正常加feature 输入经纬度
          let feature = new Feature({
            geometry: new Point([Number(point[0]), Number(point[1])])
          });
          feature.set("weight", point[3]);
          clusterLayer.getSource().getSource().addFeature(feature);   //有两层source
        });

        this.map.addLayer(clusterLayer);
        this.panTo(108.909356,27.300191)
      },

      /***
       * 行政区划
       */
      onButton12Click(){
        kmgeojson.features.forEach((featureJSON)=>{
            let feature = new GeoJSON().readFeatures(featureJSON)[0];
            // let districts = ["五华区","西山区","官渡区","呈贡区","晋宁区","盘龙区"];
            // if(districts.includes(feature.get("name"))) {
              feature.setStyle(new Style({
                stroke: new Stroke({
                  color: "rgb(43,43,43)",
                  width: 2
                }),
                fill: new Fill({
                  color: 'rgb(0,30,0,0.2)'
                })
              }));
              this.layers.pointLayer.getSource().addFeature(feature);
            // }
        });
      },

      /**
       * 云南省边界
       * */
      onButton13Click(){
        yngeojson.features.forEach((featureJSON)=>{

          let feature = new GeoJSON().readFeatures(featureJSON)[0];
          if(feature.get("name") === "昆明市"){
            feature.setStyle(new Style({
              stroke: new Stroke({
                color: "rgb(43,43,43)",
                width: 1
              }),
              fill: new Fill({
                color: 'rgb(0,200,0,0.2)'
              })
            }));
            this.layers.pointLayer.getSource().addFeature(feature);
          }
        });
      },

      /***
       * 忘了
       * */
      onButton14Click(){
        this.graticule = new Graticule({
          // the style to use for the lines, optional.
          strokeStyle: new Stroke({
            color: 'rgba(255,120,0,0.9)',
            width: 1,
            lineDash: [0.5, 4]
          }),
          showLabels: true,
          intervals: [0.0098],
          maxLines: 1000,
          targetSize: 1,
        });

        this.graticule.setMap(this.map);
      },

      onButton15Click(){
        this.addPoint(102.71762, 25.032988, {
          name: "排水公司闸-河道",
          id: "53010000091319001070"
        });
        this.addPoint(102.671356, 25.031821, {
          name: "西南建材市场东门桥头",
          id: "73"
        })
      },

      onButton16Click(){
        let num = 0;
        let lens = [];
        let lats = [];
        video_points.rows.forEach((pointData)=>{
          if(pointData.LONGITUDE && pointData.LATITUDE){
            num++;
            pointData.LONGITUDE = Number(pointData.LONGITUDE);
            pointData.LATITUDE = Number(pointData.LATITUDE);
            if(lens.includes(pointData.LONGITUDE)){
              pointData.LONGITUDE += Math.random() * 0.001;
            }
            if(lats.includes(pointData.LATITUDE)){
              pointData.LATITUDE += Math.random() * 0.001;
            }
            lens.push(pointData.LONGITUDE);
            lats.push(pointData.LATITUDE);

            this.addPoint(pointData.LONGITUDE, pointData.LATITUDE, {
              name: pointData.NAME,
              id: pointData.CAMERAID
            });
          }
        });
        console.log(num);
      },

      //所有河流
      onButton17Click(){
        const esriJson = hl;
        try{
          const features = new EsriJSON().readFeatures(esriJson);
          features.forEach((feature)=>{
            console.log(feature);
            // feature.set("name", "盘龙江");
            feature.setStyle(new Style({
              stroke: new Stroke({
                color: 'blue',
                width: 1
              }),
              // text: new Text({
              //   text: feature.get("SXMC"),
              //   // offsetX: 12,
              //   // offsetY: 12,
              //   fill: new Fill({
              //     color: 'blue'
              //   }),
              //   font: '12px sans-serif',
              //   overflow: true,
              // })
            }));
          });
          this.layers.riverLayer.getSource().addFeatures(features);
        }catch (e) {
          console.log(e);
        }
      },

      onButton18Click(){
        const layer = new TileLayer({
          source: new TileArcGISRest({
            url: "http://192.168.2.21:6080/arcgis/rest/services/sxydtc/MapServer"
          })
        });
        console.log(layer);
        this.map.addLayer(layer);
      },

      onButton19Click(){
        let id = 2;
        $.ajax({
          url: `http://192.168.2.21:6080/arcgis/rest/services/sxydtc/MapServer/3/query?
          where=1%3D1&text=&objectIds=${id}&time=&geometry=&geometryType=esriGeometryEnvelope
          &inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*
          &returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=
          &returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=
          &outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson`,
          dataType: "jsonp",
          success: (res)=>{
            //读取河流数据
            try{
              const features = new EsriJSON().readFeatures(res);
              features.forEach((feature)=>{
                feature.setStyle(new Style({
                  stroke: new Stroke({
                    color: 'blue',
                    width: 2
                  }),
                  fill: new Fill({
                    color: 'red'
                  })
                }));
              });
              this.layers.pointLayer.getSource().addFeatures(features);
            }catch (e) {
              console.log(e);
            }
          }
        })
      },

      /*地图层面的点击事件*/
      onMapClick: function(e){
        console.log(e);
        const features = this.map.getFeaturesAtPixel(e.pixel);
        if(features){
          // do something
        }
      },
    }
  }
</script>

<style scoped>
  #map{
    width: 100%;
    height: 100%;
  }
  .button-row{
    position: absolute;
    z-index: 2000;
    right: 0;
  }
  button.active{
    background: dodgerblue;
    color: white;
  }


  /*map overlay 地图信息窗口样式（官网默认）*/
  .overlay-container { display: none; }
  .ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: "✖";
  }
</style>