import { useEffect, useState } from 'react'
import { LuClipboardEdit } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'

import { IPersonDetail } from '../../models/IMovieModels'
import {
	removeFromFavorites,
	updatedUserInfo
} from '../../redux/slices/favoritePersonSlice'
import { formatDate } from '../../utils/formatter'
import { Modal } from '../ui/modal/Modal'
import { TextField } from '../ui/textField/TextField'

import classes from './favoritesPerson.module.scss'

interface personProp {
	person: IPersonDetail[]
}

export function FavoritesPerson({ person }: personProp) {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [selectedUser, setSelectedUser] = useState<IPersonDetail | null>(null)

	const [modalActive, setModalActive] = useState<boolean>(false)

	const [editName, setEditName] = useState<string>(selectedUser?.nameRu || '')
	const [editAge, setEditAge] = useState<number | string>(
		selectedUser?.age || ''
	)
	const [editProf, setEditProf] = useState<string>(
		selectedUser?.profession || ''
	)

	useEffect(() => {
		if (selectedUser) {
			setEditName(selectedUser?.nameRu || '')
			setEditAge(selectedUser?.age || '')
			setEditProf(selectedUser?.profession || '')
		}
	}, [selectedUser])

	const deleteClickHandler = (id: number) => {
		dispatch(removeFromFavorites(id))
	}

	const editClickHandler = (user: IPersonDetail) => {
		setSelectedUser(user)
		setModalActive(true)
	}

	const handleSaveChanges = () => {
		if (selectedUser) {
			const updatedUser: IPersonDetail = {
				...selectedUser,
				nameRu: editName,
				age: Number(editAge),
				profession: editProf
			}
			dispatch(updatedUserInfo(updatedUser))
		}
	}

	return (
		<>
			<Modal active={modalActive} setActive={setModalActive}>
				{selectedUser && (
					<div>
						<h2>Редактирование</h2>
						<div className='mt-[25px]'>
							<TextField
								inputValue={editName}
								onChangeHandler={e => setEditName(e.target.value)}
							/>
							<TextField
								inputValue={String(editAge)}
								onChangeHandler={e => setEditAge(Number(e.target.value))}
							/>
							<TextField
								inputValue={editProf}
								onChangeHandler={e => setEditProf(e.target.value)}
							/>
						</div>
						<button onClick={handleSaveChanges}>Сохранить</button>
					</div>
				)}
			</Modal>
			<table className={classes.listMode}>
				<thead>
					<tr>
						<th className={classes.listMode_border}>Фото</th>
						<th className={classes.listMode_border}>Имя</th>
						<th className={classes.listMode_border}>Возраст</th>
						<th className={classes.listMode_border}>Карьера</th>
						<th className={classes.listMode_border}>Фильмы</th>
						<th className={classes.listMode_border}>tools</th>
					</tr>
				</thead>
				<tbody>
					{person.map(person => (
						<tr key={person.personId}>
							<td className={classes.listMode_border}>
								<img
									src={person.posterUrl}
									style={{ width: '42px' }}
									alt={person.nameRu}
								/>
							</td>
							<td
								style={{ cursor: 'pointer' }}
								className={classes.listMode_border}
								onClick={() => navigate(`/name/${person.personId}`)}
							>
								{person.nameRu}
							</td>
							<td className={classes.listMode_border}>
								{formatDate(String(person.birthday))} • {person.age} лет
							</td>
							<td className={classes.listMode_border}>{person.profession}</td>
							<td className={classes.listMode_border}>{person.films.length}</td>
							<td className={classes.listMode_border}>
								<button onClick={() => editClickHandler(person)}>
									<LuClipboardEdit />
								</button>
								/
								<button onClick={() => deleteClickHandler(person.personId)}>
									<MdDelete />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
