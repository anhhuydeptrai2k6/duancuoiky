function sendMessage() {
    const message = document.getElementById('user-input').value.trim();
    if (!message) return;

    addMessage('👤 Player: ' + message, 'user');
    document.getElementById("user-input").value=""

    let reply = getBotReply(message);
    setTimeout(() => {
        addMessage('🤖 bot game: ' + reply, 'bot');
    }, 500);
    }

function addMessage(text, type) {
    const chatBox = document.getElementById('chat-box');
    const msg = document.createElement('div');
    msg.className = type;
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
}
const replies = [
    { keyword: ['ok','uk','uki','okioki'],reply:'OK! Chuẩn bị lên đường làm ninja thôi!'},
    { keyword: ['biết gì',"bạn biết"],reply:'Tôi biết những gì đã được huấn luyện về thế giới Ninja thôi!'},
    { keyword: ['chào','hello','hi'], reply: 'Xin chào ninja! Sẵn sàng làm nhiệm vụ chưa?' },
    { keyword: ['tên'], reply: 'Tôi là Huy Quang AI – trợ lý trong thế giới Ninja School.' },
    { keyword: ['mấy giờ'], reply: () => 'Bây giờ là: ' + new Date().toLocaleTimeString() },
    { keyword: ['ngủ'], reply: 'Ngủ ngon nhé ninja. Nghỉ ngơi để mai còn làm nhiệm vụ!' },
    { keyword: ['chào'], reply: 'Chào ninja! Hôm nay đi train level hay làm nhiệm vụ?' },
    { keyword: ['tên'], reply: 'Tôi là trợ lý ninja – luôn hỗ trợ bạn trong mọi cuộc phiêu lưu!' },

    { keyword: ['vũ khí'], reply: 'Ninja có thể sử dụng kiếm, phi tiêu, kunai hoặc shuriken để chiến đấu.' },
    { keyword: ['nhân vật'], reply: 'Bạn có thể chọn các lớp ninja khác nhau với kỹ năng riêng biệt.' },
    { keyword: ['level'], reply: 'Đánh quái và làm nhiệm vụ để tăng level và mạnh hơn!' },
    { keyword: ['train'], reply: 'Hãy tới các bãi quái phù hợp level để train nhanh hơn.' },
    { keyword: ['nhiệm vụ'], reply: 'Nói chuyện với NPC trong làng để nhận nhiệm vụ mới.' },

    { keyword: ['tôi mệt'], reply: 'Nghỉ một chút đi ninja, hồi máu rồi quay lại train tiếp!' },
    { keyword: ['cách chơi'], reply: 'Di chuyển, đánh quái, làm nhiệm vụ và nâng cấp trang bị để trở thành ninja mạnh nhất!' },

    { keyword: ['skill'], reply: 'Mỗi ninja có nhiều kỹ năng đặc biệt để chiến đấu và hỗ trợ.' },
    { keyword: ['ultimate'], reply: 'Một số kỹ năng mạnh tiêu tốn nhiều chakra nhưng gây sát thương lớn!' },
    { keyword: ['biến hình'], reply: 'Một số ninja có thể kích hoạt trạng thái sức mạnh đặc biệt.' },

    { keyword: ['game lỗi'], reply: 'Nếu game lỗi hãy thử tải lại trang hoặc báo admin.' },

    { keyword: ['hồi máu'], reply: 'Bạn có thể hồi máu bằng vật phẩm hoặc nghỉ ngơi trong làng.' },
    { keyword: ['trợ giúp'], reply: 'Bạn có thể hỏi tôi về nhiệm vụ, train level hoặc kỹ năng ninja.' },

    { keyword: ['combo'], reply: 'Kết hợp đánh thường và kỹ năng để tạo combo mạnh!' },
    { keyword: ['buff'], reply: 'Một số kỹ năng có thể tăng sát thương hoặc tốc độ đánh.' },

    { keyword: ['chế độ chơi'], reply: 'Bạn có thể chơi solo, làm nhiệm vụ hoặc chiến đấu với người chơi khác.' },

    { keyword: ['ai tạo game'], reply: 'Game Ninja này được phát triển bởi Hải Đăng.' },
    { keyword: ['đăng'], reply: 'Hải Đăng là người phát triển thế giới ninja này.' },

    { keyword: ['cheat'], reply: 'Không có cheat đâu ninja 😈 Hãy luyện tập để mạnh hơn!' },

    { keyword: ['mana', 'chakra'], reply: 'Chakra dùng để thi triển kỹ năng ninja.' },

    { keyword: ['cam on', 'cảm ơn'], reply: 'Không có gì! Tôi luôn sẵn sàng hỗ trợ ninja.' },

    { keyword: ['bạn tên gì','bạn là ai','tên bạn','bạn là'], reply: 'Tôi là trợ lý AI của làng ninja.' },

    { keyword: ['phòng thủ'], reply: 'Giữ khoảng cách và né đòn để giảm sát thương từ kẻ địch.' },
    { keyword: ['đỡ đòn', 'chặn đòn'], reply: 'Quan sát chuyển động của kẻ địch để né đòn đúng lúc.' },
    { keyword: ['né đòn', 'né'], reply: 'Nhảy và di chuyển liên tục để tránh kỹ năng nguy hiểm.' },

    { keyword: ['bắn xa'], reply: 'Phi tiêu và shuriken rất hữu ích khi tấn công từ xa.' },
    { keyword: ['giữ khoảng cách'], reply: 'Giữ khoảng cách giúp bạn an toàn trước quái mạnh.' },
    { keyword: ['tấn công'], reply: 'Ra đòn đúng lúc là chìa khóa để chiến thắng.' },

    { keyword: ['học mệt quá', 'thi cử'], reply: 'Học tập cũng giống luyện ninja, càng luyện càng mạnh.' },
    { keyword: ['code không chạy'], reply: 'Lỗi code cũng giống nhiệm vụ khó – kiên nhẫn sẽ giải được.' },
    { keyword: ['lập trình', 'python', 'it'], reply: 'Con đường lập trình cũng giống con đường ninja – cần kiên trì.' },
    { keyword: ['deadline'], reply: 'Deadline giống boss cuối. Bình tĩnh và giải quyết từng bước.' },

    { keyword: ['buồn ngủ'], reply: 'Ninja cũng cần ngủ để hồi phục chakra.' },
    { keyword: ['mất động lực'], reply: 'Mọi ninja đều từng yếu lúc đầu. Hãy tiếp tục luyện tập.' },

    { keyword: ['đêm khuya', 'thức đêm'], reply: 'Đừng thức khuya quá ninja, sức khỏe rất quan trọng.' },
    { keyword: ['stress'], reply: 'Hít thở sâu và nghỉ một chút, giống ninja thiền định vậy.' },

    { keyword: ['cảm ơn'], reply: 'Không có gì! Tôi luôn ở đây để hỗ trợ ninja.' },

    { keyword: ['hacker'], reply: 'Ninja thật sự không cần hack – chỉ cần kỹ năng.' },
    { keyword: ['cà khịa'], reply: 'Ninja chân chính không cà khịa, chỉ chiến đấu!' },

    { keyword: ['vô địch'], reply: 'Ninja vô địch là người không bỏ cuộc.' },

    { keyword: ['ninja school'], reply: 'Chào mừng đến thế giới Ninja School! Hãy trở thành ninja mạnh nhất!' }
];
function getBotReply(msg) {
    msg = msg.toLowerCase();
        for (let i = 0; i < replies.length; i++) {
            for (let j = 0; j < replies[i].keyword.length; j++) {if (msg.includes(replies[i].keyword[j])) {return typeof replies[i].reply === 'function' ? replies[i].reply() : replies[i].reply; }}
        }
    return "Xin lỗi, mình chưa hiểu bạn nói gì á 😅"
}