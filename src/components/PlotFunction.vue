<template>
  <div class="plot-function-block">
    <div v-for="(tool, index) in plots"
              :key="index"
              :class="selected === tool.alias ? 'ol-plot-vue-selected' : ''"
              @click="changeSelectedItem(tool, index)">
        <span>{{tool.name}}</span>
    </div>
  </div>
</template>

<script>

  /***
   * plot function 用于调用ol-plot插件(绘制箭头等功能)
   * 基本代码尽量不要改动，可以改动的有：
   * —— plots按钮和按钮样式
   * —— data中的样式属性（用于绘制的标记）
   * —— initPlot() 中的Z-INDEX和颜色属性
   * —— onDrawEnd() 中，完成绘制，获取到feature后的操作，例如保存到数组、上传至服务器
   */

  import "../js/ol-plot/dist/ol-plot.css";
  import olPlot from "../js/ol-plot/dist/ol-plot";
  const plots = [
    {
      "id": "Point",
      "name": "目标",
      "alias": "Point",
      "src": "Point"
    },
    {
      "id": "AttackArrow",
      "name": "进攻方向",
      "alias": "AttackArrow",
      "src": "AttackArrow"
    },
    {
      "id": "AssaultDirection",
      "name": "直箭头",
      "alias": "AssaultDirection",
      "src": "AssaultDirection"
    },
    {
      "id": "FineArrow",
      "name": "斜箭头",
      "alias": "FineArrow",
      "src": "FineArrow"
    },
    {
      "id": "DoubleArrow",
      "name": "双箭头",
      "alias": "DoubleArrow",
      "src": "DoubleArrow"
    },
    {
      "id": "StraightArrow",
      "name": "细直箭头",
      "alias": "StraightArrow",
      "src": "StraightArrow"
    },
    {
      "id": "TailedAttackArrow",
      "name": "燕尾曲箭头",
      "alias": "TailedAttackArrow",
      "src": "TailedAttackArrow"
    },
    {
      "id": "SquadCombat",
      "name": "曲箭头",
      "alias": "SquadCombat",
      "src": "SquadCombat"
    },
    {
      "id": "RectAngle",
      "name": "矩形",
      "alias": "RectAngle",
      "src": "RectAngle"
    },
    {
      "id": "Circle",
      "name": "圆形",
      "alias": "Circle",
      "src": "Circle"
    },
    {
      "id": "Ellipse",
      "name": "椭圆形",
      "alias": "Ellipse",
      "src": "Ellipse"
    },
    {
      "id": "Polygon",
      "name": "多边形",
      "alias": "Polygon",
      "src": "Polygon"
    },
    {
      "id": "GatheringPlace",
      "name": "集结地",
      "alias": "GatheringPlace",
      "src": "GatheringPlace"
    },
    {
      "id": "Sector",
      "name": "扇形",
      "alias": "Sector",
      "src": "Sector"
    },
    {
      "id": "Arc",
      "name": "弓形",
      "alias": "Arc",
      "src": "Arc"
    },
    {
      "id": "FreePolygon",
      "name": "自由面",
      "alias": "FreePolygon",
      "src": "FreePolygon"
    },
    {
      "id": "FreeHandLine",
      "name": "自由线",
      "alias": "FreeHandLine",
      "src": "FreeHandLine"
    },
    {
      "id": "Polyline",
      "name": "线",
      "alias": "Polyline",
      "src": "Polyline"
    },
    {
      "id": "Curve",
      "name": "曲线",
      "alias": "Curve",
      "src": "Curve"
    },
    {
      "id": "RectFlag",
      "name": "矩形标志旗",
      "alias": "RectFlag",
      "src": "RectFlag"
    },
    {
      "id": "TriangleFlag",
      "name": "三角标志旗",
      "alias": "TriangleFlag",
      "src": "TriangleFlag"
    },
    {
      "id": "CurveFlag",
      "name": "曲线标志旗",
      "alias": "CurveFlag",
      "src": "CurveFlag"
    },
    {
      "id": "TextArea",
      "name": "气泡",
      "alias": "TextArea",
      "src": "TextArea"
    }
  ];


  export default {
    name: "PlotFunction",
    props: {
      map: Object
    },
    data(){
      return {
        plots,
        inPlotPanel: false,
        tools: [],
        selected: '',
        title: '应急标绘',
        height: 40,
        loading: false,
        backgroundColor: 'rgba(255, 50, 255, 0.3)',
        borderColor: '#20a0ff',
        borderWidth: 1,
        opacity: 1,
        plot: null,
        schemeTitle: '',
        textAreaBackgroundColor: 'rgb(255, 255, 255)',
        textAreaBorderColor: 'rgb(238, 238, 238)',
        textAreaColor: 'rgb(1, 5, 0)',
        textAreaFontSize: 12,
        textAreaBorderWidth: 1,
        currentTextArea: null
      }
    },
    mounted(){
      if(this.map){
        this.initPlot();
      }
    },
    watch:{
      //需要有map对象才能初始化
      map (){
        if(this.map){
          this.initPlot();
        }
      }
    },
    methods:{

      /***
       * 初始化标绘工具
       */
      initPlot () {
        if (!this.plot) {
          /* eslint new-cap: 0 */
          this.plot = new olPlot(this.map, {
            zIndex: 999,
            zoomToExtent: true
          });
          this.plot.plotDraw.drawLayer.setStyle(new this.plot.StyleFactory({
            fill: {
              fillColor: this.backgroundColor
            },
            stroke: {
              strokeColor: this.borderColor,
              strokeWidth: this.borderWidth
            },
            image: {
              type: 'icon',
              image: {
                imageAnchor: [0.5, 0.5],
                imageAnchorXUnits: 'fraction',
                imageAnchorYUnits: 'fraction',
                imageOpacity: 0.75,
                imageSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmODA3ZDlmZS1mOTRhLTRmZDktOWYwYS05ZTk3NjdkYTUxMjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDM3RkNGQUJDOEUyMTFFNkIwMDFGOUI0RDhFQUI4NEYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDM3RkNGQUFDOEUyMTFFNkIwMDFGOUI0RDhFQUI4NEYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZDc5MmU0ODgtMzAxNC1kNDRiLWI4OWEtYmIxMzNhYWIyYjI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU1YWEwNTQ3LTlmMGQtNDllYS1hOGI4LTRkZWRhMmU1OGRiMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoW3u00AAAMESURBVHja7FdLaFNBFJ2Z1/eapCnUam0V6cYWEdd+FkUK4kIRF4pLxeJOV4IbpaDQgoiCK9d+loIIKi4V3CmuRJCCImpRW2ur5NP83oznJE1IXmZqEsVuvBA67717z5k5987cqTTGiLUwJdbI1oy4q/7h4INFp+PmHm/7csmczIVmbyE0I6ERG/jek2Ih8OTbmCefxbvkrc+Z8I0L4/Hhfjuxg3BrqqgvA/CoTSFOABPib89SXpzrDeS9Xl+dh/+7jqUeiKvjX7Lhq1TBHGsxLYq+iHmN2NMdEa+PqYvflvVtFH2i3fwhJobYG/0xNdUWMWf7PacvYSj/pIAWc3oSWGdaIh5KqNGFnL72t6oXWFeJuWpV09JFcx1SxW0gXH7SlyKBn68qYhS1EdmiYZwwdtnjKWBieMi54i1JbxsADthIsW3EYEKJvm4lApDKlYlwzHf85jkSkwEmsZ3E2ZI5YZNfVvJeW6XN+I0+Dg+1gm2XGntx3BaVrJOWhr0qxjYFkFmI53MFgS1UI6cvpG3CiGI3ECNfIzZi5rR+EpM7k2V5afuHAzH1Il3OcdXXRhzFbpA11GKdjTioW+2uQb9GSuOY7+olt1kUO5pPa480v3HopLE2EHtK/LQ5cctU7eVcUeBwqT1zzHc23wj2D2eOIdNMSZuBaBD3adBdkZD5m0ZOdw/5bBBlUlRs/dZxVf2Mkxit7Qmqb8xyqKBoTC3XJHo6W2gCL2C1LmJiO6VGP70DaG3L4cKyLgO7jN/oY+wnXkhsJzF7aI8vH1qrEojzWS2W8lrk8cDZ8ccx3/Fb6JgXMB9F+3PTWY3tcTZbCvdhAUnbytMr53LL1StFmpjpYrh6d5pNh+83xtUpm+TtGjGIRcyW+vHXrL6LJn6hwy1aE4gYxGrrBoL9eQWH/gSkyrR9OCCGscTo6M7Fqw+k2oGmcJ+V2YK0IX0Zw9iWr7cO2T/gzxHcIobRjSZwvR3H9XYUFdwHopIn5bzviU+83vpK3IT/x2q3WnWS//+F+Vf2S4ABAMe7cI4Rhe5DAAAAAElFTkSuQmCC'
              }
            }
          }));

          this.plot.plotDraw.on('drawEnd', this.onDrawEnd_);
          this.map.on('activeTextArea', this.activeTextArea_);
          this.map.on('disActiveTextArea', this.activeTextArea_);
          this.map.un('click', this.handleClick_);
          this.map.on('click', this.handleClick_);
        }
      },

      changeSelectedItem (item) {
        this.selected = item['alias'];
        if (item['alias']) {
          this.plot.plotEdit.deactivate();
          this.plot.plotDraw.active(item['alias'])
        } else {
          console.warn('不存在的标绘类型！')
        }
      },

      onDrawEnd_ (event) {
        let feature = event.feature;
        console.log(feature);
        // 开始编辑
        if (feature) {
          this.plot.plotEdit.activate(feature);
          this.activeToolPanel(feature)
        }
      },
      activeTextArea_ (event) {
        if (event.type === 'activeTextArea') {
          this.currentTextArea = event.target.get('activeTextArea');
          this.reFresheTextArea(this.currentTextArea)
        } else {
          console.log(event.type)
        }
      },

      handleClick_ (event) {
        let feature = this.map.forEachFeatureAtPixel(event.pixel, function (feature) {
          return feature
        });
        if (feature && feature.get('isPlot') && !this.plot.plotDraw.isDrawing()) {
          console.log(feature);
          this.plot.plotEdit.activate(feature);
          this.activeToolPanel(feature);
        } else {
          this.plot.plotEdit.deactivate();
        }
        this.currentTextArea = null;
      },

      // 激活对应的编辑面板
      activeToolPanel (feature) {
        if (feature && feature.getGeometry()) {
          const type = feature.getGeometry().getPlotType();
          if (type) {
            this.selected = type;
          }
          this.refreshe(this.plot.plotUtils.getStyleCode(feature));
        }
      },

      // 刷新对应数据
      refreshe (style) {
        if (style) {
          if (style['fill']) {
            this.opacity = style['fill']['opacity'] || this.opacity;
            this.backgroundColor = style['fill']['fillColor'] || this.backgroundColor;
          }
          if (style['stroke']) {
            this.borderWidth = style['stroke']['strokeWidth'] || this.borderWidth;
            this.borderColor = style['stroke']['strokeColor'] || this.borderColor;
          }
        }
      },

      reFresheTextArea (target) {
        if (target) {
          const _style = target.getStyle();
          if (_style) {
            if (_style['fontSize']) {
              this.textAreaFontSize = parseInt(_style['fontSize']);
            }
            if (_style['color']) {
              this.textAreaColor = _style['color'];
            }
            if (_style['border']) {
              let _border = _style['border'].split(' ');
              _border.every(item => {
                if (item.indexOf('px')) {
                  this.textAreaBorderWidth = parseInt(item);
                  return false;
                } else {
                  return true;
                }
              });
              this.textAreaBorderColor = _style['border'].slice(_style['border'].indexOf('rgb('), _style['border'].indexOf(')') + 1);
            }
            if (_style['background']) {
              this.textAreaBackgroundColor = _style['background'].slice(_style['background'].indexOf('rgb('), _style['background'].indexOf(')') + 1);
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .plot-function-block {  }
  .plot-function-block div { padding: 6px; border: 1px solid black; background: white; font-size: 12px;
    cursor: pointer;}
  .plot-function-block div:hover { background: aliceblue }
  .plot-function-block .ol-plot-vue-selected { background: #f79710; color: white;  }
</style>