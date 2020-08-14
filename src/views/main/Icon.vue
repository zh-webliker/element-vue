<template>
  <article>
    <h3>字体图标</h3>
    <p>
      字体图标就是一种特殊的字体，通过这种字体，显示给用户的就像一个个图片一样。
      <br/>
      字体图标最大的好处，在于它不会变形和加载速度快。字体图标可以像文字一样，随意通过CSS来控制它的大小和颜色，非常方便。
      <br/>
      所以现在更推荐使用字体图标，而非img图片来显示图标效果。
    </p>

    <h3>使用方法</h3>
    <p>
      主要使用较多的开源图标库有：
      <a href="https://www.iconfont.cn/" target="_blank">Iconfont</a>,
      <a href="https://material.io/tools/icons/" target="_blank">Materials-icon</a>,
      <a href="https://fontawesome.com/icons?d=gallery" target="_blank">font awesome</a>.
    </p>
    <p>
      这里以Materials-icon为例：
    </p>
    <ol>
      <li>
        <p>通过NPM安装：</p>
        <code>npm install material-design-icons</code>
      </li>
      <li>
        <p>引入图标库：</p>
        <code>import 'material-icons'</code>
      </li>
      <li>
        <p>使用：</p>
        <p><i class="material-icons">sentiment_very_satisfied</i></p>
        <code>
          &#60;i class="material-icons"&#62;sentiment_satisfied&#60;/i&#62;
        </code>
      </li>
      <li>
        <p>然后为它加上更多的css样式：</p>
        <p>
          <i class="material-icons" style="color: deepskyblue;">sentiment_satisfied</i>
          <i class="material-icons" style="color: orange; font-size: 36px;">sentiment_dissatisfied</i>
          <i class="material-icons" style="color: red; font-size: 50px; font-weight: bolder;">sentiment_very_dissatisfied</i>
        </p>
        <code>
          &#60;i class="material-icons" style="color: deepskyblue;"&#62;sentiment_satisfied&#60;/i&#62;
          <br/>
          &#60;i class="material-icons" style="color: orange; font-size: 36px;"&#62;sentiment_dissatisfied&#60;/i&#62;
          <br/>
          &#60;i class="material-icons" style="color: red; font-size: 50px; font-weight: bolder;"&#62;sentiment_very_dissatisfied&#60;/i&#62;
        </code>
      </li>
    </ol>

    <h3>使用Iconfont下载更多图标</h3>
    <ol>
      <li>
        打开<a href="https://www.iconfont.cn/" target="_blank">Iconfont</a>，搜索想要的图标。
      </li>
      <li>
        将鼠标在心仪的图标上，会出现三个选项，选择第一个：添加入库。
      </li>
      <li>
        此时右上角的购物车图标会出现已添加入库的数量，点击购物车，网页右边出现抽屉组件，显示当前已选择的图标。
      </li>
      <li>
        点击：添加至项目，会出现登录用户下的项目列表，也可以新建项目。
      </li>
      <li>
        添加完成后，在顶部导航栏中选择图标管理——我的项目，查看需要使用的项目。
      </li>
      <li>
        有两种方式可以将图标库添加至项目：在线/离线。
        <ul>
          <li>
            在线：点击查看在线链接，左侧会出现三个tab，选择Font class和Symbol，分别对应css文件和js文件。直接复制链接然后分别import即可。
          </li>
          <li>
            离线：点击下载至本地，将压缩包解压至项目目录中（最好新建一个font文件夹），分别import即可。
          </li>
        </ul>
      </li>
      <li>
        项目导入以后，就可以使用项目中的图标了。在想要使用的图标上选择复制代码，内容如下：
        <p><code>icon-piechart-circle-fil</code></p>
        完整的Iconfont图标代码：
        <p><code>&#60;i class="iconfont icon-piechart-circle-fil"&#62;&#60;/i&#62;</code></p>
      </li>
      <li>
        注意：每当更改项目中的图标，需要重新生成链接，或者重新下载覆盖原文件才能生效。
      </li>
    </ol>
  </article>
</template>

<script>
  export default {
    name: "Icon"
  }
</script>

<style scoped>
  p { line-height: 2em; color: #333333; }
  p a { color: #1b9de8; }
  code { padding: 8px 16px; background: #444444; color: white; border-radius: 5px; width: auto; line-height: 2.5em; display: inline-block;}
  ol li { margin: 8px; }
  ol li p { margin: 8px 0; }
</style>