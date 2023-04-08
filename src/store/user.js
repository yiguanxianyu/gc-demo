import {defineStore} from 'pinia'


// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
    // 其它配置项
    state: () => {
        return {
            data: [{
                title: "相见恨晚",
                uuid: "99EEA228-4E1A-0F90-E44E-F8E208366CC6",
                type: "raster",
            }, {
                title: "他在时间门外",
                uuid: "71012B98-5B6A-E063-320A-D9DF7AAF4810",
                type: "vector",
            }, {
                title: "你在等待什么吗",
                uuid: "35DE9FF6-4399-3301-014E-AE0F312E33B4",
                type: "vector",
            }],
            layers: [{
                uuid: "99EEA228-4E1A-0F90-E44E-F8E208366CC6",
                title: "相见恨晚",
                type: "raster",
                checked: true
            }],
            algorithms: [{
                label: "数据管理",
                key: "menu-data-management",
                children: [{
                    label: "栅格运算",
                    key: "data-upload",
                    text: "随着现代科技的快速发展，人们越来越依赖数字化技术来提高生产力和效率。在数字化时代，人们可以通过电子邮件、社交媒体、视频会议等方式实现远程办公和交流。这种趋势不仅使得工作变得更加高效，也使得人们的生活变得更加便利和舒适。\n\n然而，数字化时代也带来了一些挑战和风险。例如，网络安全问题成为了人们关注的重点。随着大规模数据的存储和传输，数据泄露和网络攻击的风险也在增加。此外，数字化技术的快速更新也给企业和组织带来了压力，需要不断投入大量时间和资源来跟进技术的发展。\n\n因此，我们需要在数字化时代保持警觉，并采取适当的措施来应对风险和挑战。例如，加强网络安全措施，定期更新软件和系统，提高员工的安全意识等等。只有这样，我们才能更好地应对数字化时代的挑战，实现数字化技术的最大化利用，为我们的工作和生活提供更加便捷和高效的体验。",
                    arguments: [{
                        description: "输入文件",
                        inputType: "raster",
                        required: true
                    }, {
                        description: "输出文件名",
                        inputType: "common",
                        required: true
                    }, {
                        description: "某个参数",
                        inputType: "common",
                        required: false
                    }]
                }, {
                    label: "数据下载",
                    key: "data-download",
                    text: "抽象艺术是一种以形式、色彩、线条等元素为主要表现手段，强调感觉和情感效果的艺术形式。抽象艺术与具象艺术相比，强调作品的内在表现和精神境界，而不是对现实的描述和再现。抽象艺术起源于20世纪初的欧洲，受到了几位艺术大师的影响，如蒙德里安、康定斯基、毕加索等。\n\n抽象艺术的发展经历了多个阶段，从早期的抽象表现主义、色彩派到后来的极简主义、概念艺术，每个阶段都表现出不同的艺术风格和创作手法。在现代艺术中，抽象艺术已经成为了一个独立的艺术门类，不断吸引着艺术家和观众的兴趣。\n\n抽象艺术的核心在于表现形式和情感内涵的完美融合。作品中的形式、色彩和线条等元素不再代表具体的物象，而是通过抽象的方式来表现内在的精神境界和情感体验。这种形式上的自由和精神上的深刻，使得抽象艺术成为了当代艺术的一种主要形式，引领着艺术的发展方向。",
                    arguments: [{
                        description: "arg1",
                        inputType: "vector",
                        required: true
                    }, {
                        description: "arg2",
                        inputType: "common",
                        required: true
                    }, {
                        description: "arg3",
                        inputType: "common",
                        required: false
                    }]
                }]
            }, {
                label: "基础分析",
                key: "menu-basic-analysis",
                children: [{
                    label: "NDVI计算",
                    key: "ndvi-calculation",
                    text: "哲学是一门探究宇宙、人类和生命的学科。它提供了关于世界的最基本和最深刻的问题的思考方式和答案，包括道德、政治、形而上学、认识论和伦理学等领域。哲学是一种追求智慧和真理的学科，其最终目标是理解和掌握存在和实在的本质。\n\n哲学思考的核心问题包括：什么是真理？什么是存在？什么是意义？哲学家们通过反思、探讨、研究和思考来回答这些问题。在这个过程中，哲学家们涉及到了人类的存在、价值观念、思维方式、自然界等方面，对人类文化和生命的发展做出了深刻的贡献。\n\n哲学的研究方法包括逻辑推理、思辨、演绎、归纳等，其目的是从不同角度和层次上理解世界和人类的本质。哲学研究的范围涉及到了人类文化、宗教、道德、科学等各个领域，对人类思维方式和社会制度的演变起到了积极的推动作用。\n\n总之，哲学是一门探究宇宙、人类和生命的学科，它提供了一种思考和理解世界的方式和答案。哲学家们通过思考和探讨来寻找真理和智慧，为人类文化和社会制度的发展做出了重要的贡献。",
                    arguments: [{
                        description: "arg1",
                        inputType: "raster",
                        required: true
                    }, {
                        description: "arg2",
                        inputType: "common",
                        required: false
                    }]
                }]
            }]
        }
    },
    getters: {
        getVectorArray(state) {
            let vectorArray = [];
            state.data.forEach(item => {
                if (item.type === "vector") {
                    vectorArray.push({
                        label: item.title,
                        value: item.uuid
                    })
                }
            })
            return vectorArray
        },
        getRasterArray(state) {
            let rasterArray = [];
            state.data.forEach(item => {
                if (item.type === "raster") {
                    rasterArray.push({
                        label: item.title,
                        value: item.uuid
                    })
                }
            })
            return rasterArray
        }
    }
})