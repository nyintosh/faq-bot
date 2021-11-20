import * as fs from 'fs'
import { IQuestion } from 'interfaces/IQuestion'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const path = 'pages/api/data/questions.txt'
		const data: IQuestion[] = JSON.parse(fs.readFileSync(path, 'utf8'))
		const body: IQuestion = req.body

		switch (req.method) {
			case 'GET': {
				const idx = Number(req.query.idx)
				if (!idx) return res.status(200).json(data)

				const question = data.find((v) => v.idx === idx)
				if (!question) return res.status(404).json({
					error: 'Question not found!',
				})

				return res.status(200).json(question)
			}
			case 'POST': {
				if (!body.Que || !body.Ans) return res.status(400).json({
					error: 'Invalid request body!',
				})

				const newQuestion: IQuestion = { ...body, idx: new Date().getTime() }
				data.push(newQuestion)

				fs.writeFileSync(path, JSON.stringify(data))
				return res.status(201).json(newQuestion)
			}

			case 'PUT': {
				if (!body.Que || !body.Ans) return res.status(400).json({
					error: 'Invalid request body!',
				})

				const idx = Number(req.query.idx)

				const question = data.find((v) => idx === v.idx)
				if (!question) return res.status(404).json({
					error: 'Question not found!',
				})

				const updatedQuestion = { ...question, ...req.body }
				data[data.indexOf(question)] = updatedQuestion

				fs.writeFileSync(path, JSON.stringify(data))
				return res.status(200).json(updatedQuestion)
			}

			case 'DELETE': {
				const idx = Number(req.query.idx)

				const question = data.find((v) => idx === v.idx)
				if (!question) return res.status(404).json({
					error: 'Question not found!',
				})

				data.splice(data.indexOf(question), 1)

				fs.writeFileSync(path, JSON.stringify(data))
				return res.status(200).json(question)
			}

			case 'COPY': {
				const questions = req.body
				fs.writeFileSync(path, JSON.stringify(questions))
				return res.status(201).json(questions)
			}

			case 'PURGE': {
				data.splice(0, data.length)
				fs.writeFileSync(path, JSON.stringify(data))
				return res.status(204).send('')
			}
		}
	} catch (e) {
		console.error(e)
	}
}

export default handler
