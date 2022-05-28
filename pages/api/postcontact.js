import * as fs from 'fs';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        fs.appendFileSync('contactdata/1.json', JSON.stringify(req.body)+` \n`, ()=>{})
        res.status(200).json({ name: 'abe post req ho gai' })
    } else {
      // Handle any other HTTP method
        res.status(200).json({ name: 'John Doe' })
    }
}