let current_lang = "en";

chrome.storage.local.get(["lang"], function(result) {
    current_lang = result.lang  ? result.lang : "en";

    if (typeof translate === "function")  {
        translate();
    }
});

const lang = {
    "en": {
        "icon_content": {
            "header": "SecureMe! (1.0.0)",
            "quiz_text": "Take our Quiz<br/>Here:",
            "quiz_button": "Start Quiz",
            "language": "Select Language",
            "language_1": "English",
            "language_2": "Chinese",
            "language_3": "Malay",
            "language_4": "Tamil",
            "restrictiveness": "Current Restrictiveness",
            "history": "Show History"
        },
        "forms": {
            "inputs": "This input takes sensitive information.",
            "submit": "Are you sure you want to submit the form?\It may send sensitive information. Before you submit this, please look through at the website link. It is the actual site? If not cancel this submission now!"
        },
        "facebook": {
            "popover": "Be sure to only share sensitive information with those whom you trust."
        },
        "false_domain": {
            "content": `This does not seem to be a real website. Be careful to not
                        <br/>
                        share any personal information. Were you maybe trying
                        <br/>
                        to access <a href="//{original_domain}">{original_domain}</a>?`,
            "blacklisted": `This is a Blacklisted Site. We recommend to not proceed any further`
        }
    },
    "cn": {
        "icon_content": {
            "header": "CN - SecureMe! (1.0.0)",
            "quiz_text": "参加我们的考查<br/>点击这里:",
            "quiz_button": "开始考查",
            "language": "选择语言",
            "language_1": "英语",
            "language_2": "中文",
            "language_3": "马来语",
            "language_4": "泰米",
            "restrictiveness": "目前的限制性",
            "history": "显示历史"
        },
        "forms": {
            "inputs": "此输入采用敏感信息",
            "submit": "您确定要提交表单吗？\它可能会发送敏感信息。"
        },
        "facebook": {
            "popover": "请务必仅与您信任的人共享敏感信息。"
        },
        "false_domain": {
            "content": `这似乎不是一个真正的网站。小心不要
                        <br/>
                        分享任何个人信息。你可能正在尝试
                        <br/>
                        进接 <a href="//{original_domain}">{original_domain}</a>?`
        }
    },
    "my": {
        "icon_content": {
            "header": "MY - SecureMe! (1.0.0)",
            "quiz_text": "Ambil Kuiz kami<br/>Di sini:",
            "quiz_button": "Mula Kuiz",
            "language": "Pilih Bahasa",
            "language_1": "Bahasa Inggeris",
            "language_2": "Bahasa Cina",
            "language_3": "Bahasa Malay",
            "language_4": "Bahasa Tamil",
            "restrictiveness": "Pembatasan semasa",
            "history": "Tunjukkan Sejarah"
        },
        "forms": {
            "inputs": "Input ini mengambil maklumat sensitif.",
            "submit": "Adakah anda pasti ingin menyerahkan borang itu? Ia boleh menghantar maklumat sensitif."
        },
        "facebook": {
            "popover": "Pastikan anda hanya berkongsi maklumat sensitif dengan mereka yang anda percayai."
        },
        "false_domain": {
            "content": `Ini nampaknya bukan laman web sebenar. Berhati-hati tidak
                        <br/>
                        kongsi apa-apa maklumat peribadi. Adakah anda mungkin cuba
                        <br/>
                        untuk mengakses <a href="//{original_domain}">{original_domain}</a>?`
        }
    },
    "in": {
        "icon_content": {
            "header": "IN - SecureMe! (1.0.0)",
            "quiz_text": "எங்கள் வினாடி வினாவை எடுங்கள்<br/>இங்கே:",
            "quiz_button": "வினாடி வினா தொடங்கு",
            "language": "மொழி தேர்ந்தெடு",
            "language_1": "ஆங்கிலம்",
            "language_2": "சீன",
            "language_3": "மலாய்",
            "language_4": "தமிழ்",
            "restrictiveness": "தற்போதைய கட்டுப்பாட்டு",
            "history": "வரலாறு காட்டு"
        },
        "forms": {
            "inputs": "இந்த உள்ளீட்டை முக்கியமான தகவல் எடுக்கும்.",
            "submit": "நீங்கள் நிச்சயமாக சமர்ப்பிக்க விரும்புகிறீர்களா? \ இது முக்கியமான தகவல்களை அனுப்பலாம்."
        },
        "facebook": {
            "popover": "நீங்கள் நம்புவோருடன் முக்கியமான தகவலை மட்டும் பகிர்ந்து கொள்ளுங்கள்."
        },
        "false_domain": {
            "content": `இது ஒரு உண்மையான வலைத்தளமாகத் தெரியவில்லை. கவனமாக இருங்கள்
                        <br/>
						எந்தவொரு தனிப்பட்ட தகவலையும் பகிரலாம். ஒருவேளை நீங்கள் முயற்சி செய்யலாம்
                        <br/>
						அணுக <a href="//{original_domain}">{original_domain}</a>?`
        }
    }
};