import { IQuestion } from './../modules/shared/interfaces/models/quiz.interface';
import { API_DOMAIN, CONTROLLER } from '../utils/constants/app.constant';
import ILecture from "../modules/shared/interfaces/models/lecture.interface"
import axios from 'axios';
import IFile from '../modules/shared/interfaces/models/file.interface';
import IQuiz from '../modules/shared/interfaces/models/quiz.interface';

const prefix = `${API_DOMAIN}/${CONTROLLER.quiz}`;


export function apiUpdateQuiz(id: string, data: Partial<IQuiz>): Promise<IQuiz> {
    return axios.patch(`${prefix}/${id}`, data).then(res => res.data)
}
export function apiAddQuizQuestion(id: string, data: Partial<IQuestion>): Promise<IQuestion> {
    return axios.patch(`${prefix}/add-question/${id}`, data).then(res => res.data)
}

export function apiUpdateQuizQuestion(id: string, questionId: string, data: Partial<IQuestion>): Promise<IQuestion> {
    return axios.patch(`${prefix}/update-question/${id}/${questionId}`, data).then(res => res.data)
}

export function apiDeleteQuizQuestion(id: string, questionId: string,): Promise<IQuestion> {
    return axios.patch(`${prefix}/delete-question/${id}/${questionId}`,).then(res => res.data)
}

// export function apiUpdateVideo(id: string, data: Partial<IFile>): Promise<IFile> {
//     return axios.patch(`${prefix}/update-video/${id}`, data).then(res => res.data)
// }
