//引入一个包
const path = require('path')
//引入html插件  能够自动生成html文件
const HTMLWebpackPlugin = require('html-webpack-plugin');
//引入clean插件 
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//Webpack中所有的配置信息都应该写在module.exports中
module.exports = {
    //指定入口文件
    entry:"./src/index.ts",

    //指定打包文件所在目录
    output:{
        //指定打包目录
        path:path.resolve(__dirname,'dist'),
        //打包后的文件
        filename:"bundle.js",

        //告诉webpack不使用箭头函数
        environment:{
            arrowFunction:false,
            const:false
        }
    },
    //指定webpack打包时要使用模块
    module:{
        //指定要加载得规则
        rules:[
            {
                //test指定得是规则生效的文件
                test:/\.ts$/,
                //要使用的loader
                use:[
                    //配置babel
                    {
                        loader:"babel-loader",
                        //设置babel
                        options:{
                            //设置预定义的环境
                            presets:[
                                [
                                    //指定环境的插件
                                "@babel/preset-env",
                                //配置信息
                                {
                                    targets:{
                                        "chrome":"88"
                                    },
                                    "corejs":"3",
                                    "useBuiltIns":"usage"
                                }
                                ]
                            ]
                        }
                    },
                    'ts-loader'//后面先执行
                ],
                //要排除的文件
                exclude:/node_modules/,
            },
            //设置less文件的处理
            {
                test:/\.less$/,
                use:[//从下往上执行，先less后css，最后style
                    "style-loader",
                    //注意顺序！！！！
                    "css-loader",
                    //引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            //兼容最新的两个游览器
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    
                    "less-loader"
                ]
            }
        ]
    },

    //配置webpack插件
    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
           // title:"这是一个自定义的title",
           //模板网页
            template:"./src/index.html"
        })
    ],
    //用来设置引用模块，告诉它凡是以js，ts结尾都是可以使用模块化
    resolve:{
        extensions:['.ts','.js']
    },
    mode: 'development' // 设置mode
} 

