import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineReload, AiOutlineRobot } from 'react-icons/ai'

import styles from 'styles/Home.module.scss'

interface IQuestion {
	id: number,
	question: string,
	answer: string,
}

const Home: NextPage<{ data: IQuestion[] }> = ({ data }) => {
	const faqRef = useRef<HTMLDivElement>(null)
	const tabRef = useRef<HTMLDivElement>(null)

	const [ IsChatActive, setChatActive ] = useState(true)

	useEffect(() => {
		const el = tabRef.current
		if (!el) return

		el.onwheel = (e) => el.scrollBy({
			left: e.deltaY < 0 ? -30 : 30,
		})
	}, [])

	const addMessage = (text: string, client: boolean) => {
		if (!faqRef.current) return
		const el = document.createElement('div')
		el.innerHTML = `<p>${text}</p>`
		el.classList.add(`${!client && styles.bot}`)

		faqRef.current.appendChild(el)
		faqRef.current.scrollTo(
			0,
			faqRef.current.scrollHeight,
		)
	}

	const startChats = (id: number) => {
		const current = data.find((v) => id === v.id)
		if (!current) return

		addMessage(current.question, true)
		setChatActive(false)

		setTimeout(() => {
			addMessage(current.answer, false)
			setChatActive(true)
		}, 5e2)
	}

	return (
		<section className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.chat_box}>
					<div className={styles.chat_box__header_title}>
						<div>
							<span className={styles.icon}><AiOutlineRobot /></span>
							<span>FAQ bot</span>
						</div>
						<div onClick={() => window.location.reload()} className={styles.icon}>
							<AiOutlineReload />
						</div>
					</div>
					<div className={styles.chat_box__conversation} ref={faqRef}>
						<div className={styles.intro}>
							<p>Pick a question to start a conversation . .</p>
						</div>
					</div>
					<div className={styles.chat_box__question_tab} ref={tabRef}>
						{data.map((v) => (
							<button
								key={v.id}
								onClick={() => IsChatActive && startChats(v.id)}
								disabled={!IsChatActive}
							>
								{v.question}
							</button>
						))}
						<span />
					</div>
				</div>
			</div>
		</section>
	)
}

export const getStaticProps = async () => {
	const host = 'development' !== process.env.NODE_ENV
		? 'https://faq-bot.vercel.app'
		: 'http://localhost:3000'

	if (!host) return {
		props: {
			data: [],
		},
	}

	const resp = await fetch(`${host}/api`)
	const data: IQuestion[] = await resp.json()

	return {
		props: { data },
	}
}

export default Home
