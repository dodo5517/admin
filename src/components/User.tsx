import React, { useState } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    phone_number: string;
    dealing_count: number;
    reputation: number;
    role: string;
    auth_provider: string;
    profile_image: string | null;  // 프로필 이미지는 null일 수 있습니다.
    created_at: string;
    modified_at: string;
};

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     address: string;
//     phone_number: string;
//     dealing_count: number;
//     reputation: number;
//     role: string;
//     auth_provider: string;
//     profile_image: string | null;
//     created_at: string;
//     modified_at: string;
// }
//
// interface UserProps {
//     isOpen: boolean;
//     onClose: () => void;
//     users: User[];
// }
function User(){
    const users: User[] = [
        {
            id: 1,
            email: 'dodo51@naver.com',
            auth_provider: '네이버',
            name: '도도',
            password: '1234',
            profile_image: '이미지',
            address: '미사용',
            phone_number: '010-1234-5678',
            dealing_count: 1,
            reputation: 30,
            role: '유저',
            created_at: '2024-11-07',
            modified_at: '2024-11-07',
        },
        {
            id: 2,
            email: 'qkr10@kakao.com',
            auth_provider: '카카오',
            name: '다리텔',
            password: '1234',
            profile_image: '이미지',
            address: '미사용',
            phone_number: '010-1234-5678',
            dealing_count: 1,
            reputation: 30,
            role: '유저',
            created_at: '2024-11-07',
            modified_at: '2024-11-07',
        },
        // 다른 사용자 데이터 추가
    ];

    return (
            <div className="user-content">
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>이메일</th>
                        <th>회원가입 플랫폼</th>
                        <th>이름</th>
                        <th>비밀번호</th>
                        <th>프로필 이미지</th>
                        <th>주소</th>
                        <th>휴대폰 번호</th>
                        <th>거래 횟수</th>
                        <th>평판</th>
                        <th>역할</th>
                        <th>생성시간</th>
                        <th>수정시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user:any,i:number) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.auth_provider}</td>
                            <td>{user.name}</td>
                            <td>{user.password}</td>
                            <td>{user.profile_image}</td>
                            <td>{user.address}</td>
                            <td>{user.phone_number}</td>
                            <td>{user.dealing_count}</td>
                            <td>{user.reputation}</td>
                            <td>{user.role}</td>
                            <td>{user.created_at}</td>
                            <td>{user.modified_at}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
    )
}

export default User;