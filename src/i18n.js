    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';
    import LanguageDetector from 'i18next-browser-languagedetector';


    // 正确的对象语法，使用冒号而不是等号
const resources = {
    en: {
        translation: {
        nav: {
            home: "Home",
            about: "About Us",
            services: "Services",
            contact: "Contact"
        },
        hero: {
            title: "Embark on Your Next WAVECATION Adventure",
            subtitle: "Wavecation offers all-in-one travel experiences, letting you dive into the thrill of the ocean — literally.",
            button: "Explore more"
        },
        header: {
            button1: "Home",
            button2: "Packages",
            customTrip: "Customized Trip",
            divingTours: "Diving Tours",
            button3: "Souvenirs",
            button4: "About Us",
            button5: "Contact Us"
        },
        services: {
            title1: "Tailored Travel Experiences",
            desc1: "We design customized travel experiences based on your unique needs and preferences. Whether you're into diving or snorkeling, we'll ensure an unforgettable journey.",
            button1: "Get a Quote",
            title2: "Unique Souvenirs",
            desc2: "Find charming souvenirs like keychains, bracelets, and lanyards — perfect for remembering your unforgettable journey with Wavecation.",
            button2: "Browse Products",
            title3: "Diving Tour Groups",
            desc3: "Travel the world with our guided diving tours — safe, fun, and expertly arranged for your comfort and adventure.",
            button3: "View Itineraries",
            title4: "Beach & Underwater Photo Sessions",
            desc4: "Our certified dive photographers will capture your underwater magic with stunning, high-resolution photos and videos — a perfect keepsake from your ocean journey.",
            button4: "Book a Session"
        },
        gallery: {
            title: "Memorable moments"
        },
        contact: {
            title: "Contact Us",
            subtitle1: "Click the buttons below to get in touch",
            subtitle2: "Leave us a message",
            ques1: "Name",
            ans1: "Please enter your name",
            ques2: "Email",
            ans2: "Please enter your email address",
            ques3: "Message",
            ans3: "Please enter your message",
            button: "Submit Message",
            process: "Submitting...",
            success: "Your message has been submitted. Thank you!",
            failed: "Submission failed. Please try again later or contact us via other methods."
        },
        trips: {
            title: "Customized Tioman Island Trip",
            subtitle: "Trip Customization Options",
            phone: "Contact Number",
            phone_eg: "e.g., +60 12-345 6789",
            date1: "Departure Date",
            date2: "Return Date",
            packages: "Activity Package",
            choose: "Please Select",
            choice1: "Open Water Diving Course (OW)",
            choice2: "Advanced Open Water Diving Course (AOW)",
            choice3: "Fun Dive",
            choice4: "Snorkeling",
            choice5: "Beach/Underwater Photo Session",
            adults: "Adults",
            adultsUnit: "person(s)",
            children: "Children",
            childrenUnit: "child(ren)",
            rooms: "Rooms",
            roomsUnit: "room(s)",
            transport: "Transportation to/from Jetty",
            address: "Pickup Address",
            addresscol: "Please enter pickup address",
            ferry: "Ferry Ticket",
            meal: "Meal Package",
            required: "Required",
            notrequired: "Not Required",
            Malaysian: "Malaysian Citizen",
            yes: "Yes",
            no: "No",
            button: "Submit Booking Request",
            contact_us_button: "Submit Booking Request",
            booking_disabled_message: "Due to system upgrades, online bookings are temporarily unavailable. Please contact us via our social media or WhatsApp to make your reservation. We apologize for any inconvenience.",
            tourstitle: "Upcoming Diving Tours",
            toursdesc1: "We're planning more exciting dive trips to world-class sites like Komodo and Mabul Island.",
            toursdesc2: "Coming Soon"
        },
        souvenirs: {
            title: "Wavecation Souvenirs",
            subtitle: "Marine Life Keychains",
            desc: "Fully poseable — twist any way you like. Great for stress relief!",
            color: "Color",
            quantity: "Quantity",
            confirm: "Confirm",
            cancel: "Cancel",
            soldOut: "Sold Out",
            stock: "In Stock",
            button: "Add to Cart",
            freeShipping: "* Free shipping for orders over RM200",
            colors: {
                classicLightGrey: "Light Grey",
                classicDarkGrey: "Dark Grey",
                starryBlue: "Starry Blue",
                starryGreen: "Starry Dark Green",
                lightGrey: "Light Grey",
                lightBlue: "Light Blue",
                darkBlue: "Dark Blue",
                classicBlackWhite: "Classic Black & White",
                carbonBlue: "Carbon Blue"
            }
        },
        cart: {
            title: "Shopping Cart",
            emptyCart: "Your cart is currently empty",
            addItemsPrompt: "Add items to your cart to proceed",
            subtotal: "Subtotal",
            shippingFee: "Shipping Fee",
            freeShippingPromo: "Free Shipping!",
            eastMalaysia: "East Malaysia",
            westMalaysia: "West Malaysia",
            freeShippingMessage: "* Congratulations! Your order qualifies for free shipping (orders over RM200)",
            grandTotal: "Grand Total",
            customerInfo: "Customer Information",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            selectRegion: "Select Shipping Region",
            noRegionSelectionNeeded: "No region selection required for orders with free shipping",
            address: "Shipping Address",
            paymentMethod: "Payment Method",
            bankTransfer: "Bank Transfer",
            paymentInstructions: "Payment Instructions",
            paymentInstruction1: "Please complete the payment before placing your order",
            paymentInstruction2: "Please include your name in the payment reference",
            paymentInstruction3: "We will verify your payment once it is received",
            paymentInstruction4: "Orders will be processed within 1–3 business days",
            paymentInstruction5: "A tracking notification will be sent once your order is shipped",
            paymentInstruction6: "Your order qualifies for free shipping!",
            scanTNGQR: "Scan the TNG QR code below to make a payment",
            totalAmount: "Total Amount Due",
            includesFreeShipping: "Includes free shipping discount",
            bankTransferInfo: "Bank Transfer Details",
            bank: "Bank Name",
            accountName: "Account Holder Name",
            accountNumber: "Account Number",
            sendPaymentProof: "Please send proof of payment to our email or WhatsApp after completing the transfer",
            checkout: "Place Order",
            orderSuccess1: "Order Submitted Successfully!",
            orderSuccess2: "Thank you for your purchase!"
        },
        alerts: {
            insufficientStock: "Insufficient stock. Max available: ",
            unit: "piece(s)",
            invalidQuantity: "Please enter a valid quantity",
            completeInfo: "Please complete all customer information"
        },
        about: {
            heroTitle: "Wavecation's Core Philosophy",
            heroDesc: "Freedom to explore, immersive travel, and ocean conservation – this is our promise.",
            freedomTitle: "Freedom and Exploration",
            freedomP1: "We believe that travel is the purest form of pursuing freedom. Wavecation offers unbounded island experiences for adventurers, allowing you to explore the ocean at your own pace.",
            freedomP2: "From morning dives to sunset beach walks, our itineraries are designed to give you the most freedom, turning every moment into a unique memory.",
            deepTitle: "Immersive Travel Experiences",
            deepP1: "We reject superficial sightseeing tours. Every Wavecation itinerary is carefully designed to immerse you in the local marine ecology, culture, and community.",
            deepP2: "Collaborate with local guides, join marine conservation projects, and savor authentic seafood cuisine – these experiences turn your vacation into a life-changing journey.",
            oceanTitle: "Our Commitment to Ocean Conservation",
            oceanP1: "As ocean lovers, protecting marine ecosystems is our core responsibility. We adopt sustainable tourism practices to minimize environmental impact.",
            oceanP2: "All our diving activities strictly follow marine conservation standards. We regularly organize ocean conservation programs involving coral reef restoration and underwater cleanups.",
            oceanP3: "We believe protecting the ocean requires real action from everyone. Join our journey – you're not only exploring the ocean, but also contributing to safeguarding this blue planet.",
            ctaTitle: "Join Our Ocean Conservation Journey",
            ctaDesc: "By choosing Wavecation, you're not just gaining an unforgettable travel experience — you're becoming an active participant in protecting the ocean.",
            photoCredit: "Image source"
        },

        tours: {
            pageTitle: "Dive Tours",
            bali: {
                title: "BALI 6D5N Dive Trip",
                posterAlt: "Bali Dive Trip Poster"
            },
            locations: "Amed | Tulamben | Nusa Penida ",
            divePackage:"12 Dives with Big Marine Life Encounters",
            button:"Explore Now",
            earlyBird: "Early Bird Deal",
            normalPrice: "Original Price",
            validUntil: "Valid until",
            includesTitle: "What’s Included",
            excludesTitle: "What’s Not Included",
            includesList: [
            "5-night hotel stay, twin room (with breakfast)",
            "single room, surcharge of RM170 per night",
            "12 dives: 5 boat dives, 6 shore dives, and 1 night dive",
            "2 Lunches",
            "FOC Equipment rental",
            "FREE Limited edition T-shirt"
            ],
            excludesList: [
            "Round-trip airfare",
            "Travel insurance",
            "In-store food and beverange expenses",
            "Round-trip Transportation",
            "Land tour expenses",
            "Use of special equipment"
            ],
            reminder:"The itinerary is subject to change due to force majeure (e.g. sea conditions or other natural disasters)",
            resort:"Enjoy our curated luxury resort and its stunning surroundings.",
            diveSites:"Beyond destinations — these dive sites reveal the untold stories of the sea.",
            amed:"Amed",
            amedP1:"Located on the northeast coast of Bali, Amed Bay is known for its calm black-sand beaches and vibrant marine biodiversity. The clear and gentle waters make it an ideal spot for shore dives and buoyancy practice—perfect for divers who love to slow down and explore the little things.",
            amedP2:"Amed's dive sites offer a mix of coral slopes, wrecks, and macro havens. From pygmy seahorses to colorful nudibranchs and rare critters hiding among soft corals, every dive here reveals a new underwater wonder.",
            tulamben:"Tulamben",
            tulambenP1:"Tulamben is one of Bali's most iconic dive destinations, best known for the WWII wreck site — the USS Liberty. Resting just off the shore, this accessible wreck is perfect for all diver levels and a dream location for wreck photography and exploration.",
            tulambenP2:"Beyond the wreck, Tulamben is home to vibrant marine life including massive schools of fish, giant octopuses, lionfish, and nudibranchs. The diverse underwater landscape makes every dive an exciting and discovery-filled experience.",
            contactTitle: "Contact Us to Register or Ask",
            requirementLabel: "Minimum Requirement:",
            noCertOffer: "No license yet? Add RM800 and get certified during the trip!",
            contactZync: "Message Zync for details",
            contactAmber: "Message Amber for details",
            contact: "DM us directly to sign up or ask questions!"
        }

        
        }
    },

    zh: {
        translation: {
        nav: {
            home: "首页",
            about: "关于我们",
            services: "服务内容",
            contact: "联系我们"
        },
        hero: {
            title: "开启您的专属海洋假期",
            subtitle: "Wavecation为您量身打造一站式旅游服务，尽情畅享潜水与浮潜的乐趣。",
            button: "立即探索"
        },
        header: {
            button1: "首页",
            button2: "旅游配套",
            customTrip: "定制化行程",
            divingTours: "潜水旅游团",
            button3: "纪念品",
            button4: "关于我们",
            button5: "联系我们"
        },
        services: {
            title1: "定制化旅游体验",
            desc1: "我们为每一位客户量身打造专属旅游方案，满足您的独特需求与喜好。无论是潜水还是浮潜，我们都为您安排最精彩的海洋体验。",
            button1: "开始规划",
            title2: "特色纪念品",
            desc2: "在Wavecation，您可以选购钥匙圈、手链、吊绳等各类精致纪念品，为您的旅程留下美好回忆。",
            button2: "浏览商品",
            title3: "潜水旅游团",
            desc3: "跟随我们的潜水团队，探索全球迷人海域，享受安全又便捷的深海之旅。",
            button3: "查看行程",
            title4: "海边/水下写真拍摄",
            desc4: "由专业认证的潜水摄影师为您定格每个精彩水下瞬间，提供高质量照片与视频，留下难忘的海洋回忆。",
            button4: "预约拍摄"
        },
        gallery: {
            title: "精彩瞬间"
        },
        contact: {
            title: "联络我们",
            subtitle1: "点击下方按钮获取联系方式",
            subtitle2: "给我们留言",
            ques1: "姓名",
            ans1: "请输入您的姓名",
            ques2: "电子邮箱",
            ans2: "请输入您的电子邮箱",
            ques3: "留言内容",
            ans3: "请输入您的留言内容",
            button: "提交留言",
            process: "提交中...",
            success: "留言已成功提交！感谢您的反馈。",
            failed: "提交失败，请稍后再试或通过其他方式联系我们。"
        },
        trips: {
            title: "刁曼岛客制化行程",
            subtitle: "行程定制选项",
            phone: "联系电话",
            phone_eg: "例如: +60 12-345 6789",
            date1: "出发日期",
            date2: "返回日期",
            choice1: "开放水域潜水课程(OW)",
            choice2: "进阶开放水域课程(AOW)",
            choice3: "欢乐潜水(Fundive)",
            choice4: "浮潜",
            choice5: "海边/水下写真拍摄",
            adults: "成人",
            adultsUnit: "位",
            children: "儿童",
            childrenUnit: "位",
            rooms: "房间数",
            roomsUnit: "间",
            transport: "往返码头交通",
            address: "接送地址",
            addresscol: "请输入接送地址",
            ferry: "船票",
            meal: "包餐",
            required: "需要",
            notrequired: "不需要",
            Malaysian: "马来西亚公民",
            yes: "是",
            no: "否",
            button: "提交预订请求",
            contact_us_button: "提交预订请求",
            booking_disabled_message: "由于系统升级，目前暂不接受在线预订。请通过我们的社交媒体或WhatsApp联系我们进行预订，给您带来不便敬请谅解。",
            tourstitle: "潜水旅游团即将开放",
            toursdesc1: "我们正在筹备更多精彩的潜水旅游团，包括科莫多、马布岛等世界级潜点",
            toursdesc2: "即将推出"
        },
        souvenirs: {
            title: "Wavecation纪念品",
            subtitle: "海洋生物钥匙圈",
            desc: "全关节可动，怎么扭都可以，解压效果拉满！",
            color: "选择颜色",
            quantity: "数量",
            confirm: "确定",
            cancel: "取消",
            soldOut: "售罄",
            stock: "库存",
            button: "加入购物车",
            freeShipping: "* 满RM200可享免邮优惠",
            colors: {
                classicLightGrey: "经典浅灰色",
                classicDarkGrey: "经典深灰色",
                starryBlue: "星空款蓝色",
                starryGreen: "星空款墨绿色",
                lightGrey: "浅灰色",
                lightBlue: "浅蓝色",
                darkBlue: "深蓝色",
                classicBlackWhite: "经典黑白",
                carbonBlue: "碳蓝色"
            }
        },
        cart: {
            title: "购物车",
            emptyCart: "购物车是空的",
            addItemsPrompt: "请添加一些商品到购物车",
            subtotal: "商品总额",
            shippingFee: "运费",
            freeShippingPromo: "免邮优惠！",
            eastMalaysia: "东马",
            westMalaysia: "西马",
            freeShippingMessage: "* 恭喜！您的订单已满足免邮条件（满 RM200 免邮）",
            grandTotal: "总计",
            customerInfo: "客户信息",
            name: "姓名",
            email: "电子邮箱",
            phone: "联系电话",
            selectRegion: "选择配送地区",
            noRegionSelectionNeeded: "免邮订单无需选择地区",
            address: "收货地址",
            paymentMethod: "付款方式",
            bankTransfer: "银行转账",
            paymentInstructions: "付款说明",
            paymentInstruction1: "请在下单前完成付款",
            paymentInstruction2: "请在转账备注中填写您的姓名",
            paymentInstruction3: "我们将在收到款项后进行付款核实",
            paymentInstruction4: "订单将在 1–3 个工作日内被处理",
            paymentInstruction5: "发货后您将收到包含物流信息的通知",
            paymentInstruction6: "您的订单享受免邮优惠!",
            scanTNGQR: "请扫描以下 TNG 二维码进行付款",
            totalAmount: "应付总额",
            includesFreeShipping: "已包含免邮优惠",
            bankTransferInfo: "银行转账信息",
            bank: "银行名称",
            accountName: "账户名称",
            accountNumber: "银行账户号码",
            sendPaymentProof: "转账后请将付款凭证发送至我们的邮箱或 WhatsApp",
            checkout: "提交订单",
            orderSuccess1: "订单提交成功！",
            orderSuccess2: "感谢您的购买！"
        },
        alerts: {
            insufficientStock: "库存不足，当前最多可购买: ",
            unit: "件 ",
            invalidQuantity: "请输入有效的数量",
            completeInfo: "请填写完整的客户信息"
        },
        about: {
            heroTitle: "Wavecation的核心理念",
            heroDesc: "自由探索，深度旅行，保护海洋 - 这是我们的承诺",
            freedomTitle: "自由与探索",
            freedomP1: "我们相信旅行是追求自由的最纯粹形式。Wavecation为冒险者提供无拘无束的海岛体验，让您以自己的节奏探索海洋的奥秘。",
            freedomP2: "从清晨的潜水到黄昏的海滩漫步，我们设计的行程给予您最大的自由空间，让每个瞬间都成为独特的回忆。",
            deepTitle: "深度旅行体验",
            deepP1: "我们拒绝走马观花式的旅游。Wavecation的每个行程都经过精心设计，让您深入了解当地海洋生态、文化和社区。",
            deepP2: "与当地向导合作，参与海洋保护项目，品尝地道海鲜料理 - 这些体验让您的旅行超越普通度假，成为改变人生的旅程。",
            oceanTitle: "海洋保护承诺",
            oceanP1: "作为海洋的热爱者，保护海洋生态是我们的核心责任。我们采用可持续的旅游方式，最小化对环境的影响。",
            oceanP2: "我们的所有潜水活动严格遵守海洋保护规范。我们定期组织海洋生态保护活动，带领游客参与珊瑚礁保育和海底清洁行动。",
            oceanP3: "我们相信，保护海洋需要每个人的实际行动。加入我们的旅程，您不仅是在探索海洋，更是在为守护这片蓝色星球贡献力量。",
            ctaTitle: "加入我们的海洋保护之旅",
            ctaDesc: "选择Wavecation，您不仅获得难忘的旅行体验，更成为海洋保护的积极参与者",
            photoCredit: "图片来源"
        },

        tours: {
            pageTitle: "潜水旅游团",
            bali: {
                title: "巴厘岛 6天5夜潜水团",
                posterAlt: "巴厘岛潜水团海报"
            },
            locations: "艾湄湾 | 图蓝本 | 佩妮达",
            divePackage:"6天12潜大货套餐",
            button:"立即探索",
            earlyBird: "早鸟优惠",
            normalPrice: "原价",
            validUntil: "优惠截止至",
            includesTitle: "费用包含",
            excludesTitle: "费用不包含",
            includesList: [
            "5晚酒店住宿，双人间（含早餐）",
            "单人房，每晚需额外加收 RM170",
            "共12支潜水：5次船潜、6次岸潜、1次夜潜",
            "2次午餐",
            "免费潜水装备租借",
            "免费限量版T恤"
            ],
            excludesList: [
            "来回机票",
            "旅游/潜水保险",
            "岛上饮食及饮料消费",
            "来回陆地交通",
            "陆地游相关费用",
            "特殊装备的使用"
            ], 
            reminder:"行程可能因不可抗力因素而有所调整（例如海况或其他自然灾害）",
            resort:"体验我们精心挑选的豪华度假村与周边迷人环境",
            diveSites:"超越目的地——这些潜点揭示海洋未曾言说的故事",
            amed:"艾湄湾",
            amedP1:"坐落于巴厘岛东北角的艾湄湾，以宁静的黑沙滩和丰富的海洋生态而闻名。这里的水域平静透明，是体验岸潜和练习浮力控制的绝佳场所，特别适合喜欢探索细节的潜水员。",
            amedP2:"艾湄湾的潜点多样，包括斜坡珊瑚礁、沉船残骸与宏观生物天堂。你可能会在软珊瑚之间发现海马、豆丁海马、蛞蝓及各种色彩斑斓的微生物，让每一次下潜都充满惊喜。",
            tulamben:"图蓝本",
            tulambenP1:"图蓝本是巴厘岛最著名的潜水胜地之一，最著名的潜点是二战时期沉船——自由号（USS Liberty）。这艘沉船就位于岸边，入水方便，适合各级潜水员，是水下摄影和沉船探险的理想场所。",
            tulambenP2:"除了沉船，图蓝本还拥有丰富的海洋生态，如成群鱼群、巨型章鱼、狮子鱼和裸鳃类动物。这里的海底地形多变，能带来既刺激又充满探索感的潜水体验。",
            contactTitle: "立即报名或咨询",
            requirementLabel: "最低报名条件：",
            noCertOffer: "还没考？只需加 RM800，即可边玩边完成 AOW 认证！",
            contactZync: "联系 Zync 了解详情",
            contactAmber: "联系 Amber 了解详情",
            contact: "直接DM我们报名或询问！"
        }

        }
    }
};    

        
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, // 确保包含resources
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng' // 明确指定localStorage key
    },
    interpolation: {
      escapeValue: false // React已经防止XSS
    }
  });

export default i18n;