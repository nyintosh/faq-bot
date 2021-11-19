import { NextApiRequest, NextApiResponse } from 'next'

import data from 'pages/api/assets/questions.json'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	if ('GET' === req.method) {
		res.status(200).json(data)
	}
}

export default handler
