// 简单的文件存储方案
import fs from 'fs';
import path from 'path';

const contactsFilePath = path.join(process.cwd(), 'data', 'contacts.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;
    const timestamp = new Date().toISOString();
    
    // 确保数据目录存在
    if (!fs.existsSync(path.dirname(contactsFilePath))) {
      fs.mkdirSync(path.dirname(contactsFilePath), { recursive: true });
    }
    
    // 读取现有数据或初始化空数组
    let contacts = [];
    if (fs.existsSync(contactsFilePath)) {
      contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
    }
    
    // 添加新留言
    contacts.push({
      name,
      email,
      message,
      timestamp
    });
    
    // 保存回文件
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
    
    return res.status(200).json({ message: 'Contact saved successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ message: 'Error saving contact' });
  }
}