import React, { useState } from 'react';
import { CategoryEditModal } from "./CategoryEditModal";
import { CategoryDeleteModal } from "./CategoryDeleteModal";
import { CategoryAddModal } from "./CategoryAddModal";

type CategoryType = 'large' | 'middle' | 'small';

type Category = {
    large: string[];
    middle: string[];
    small: string[];
};

function Category() {
    const [categories, setCategories] = useState<Category>({
        large: ['휴대폰', '노트북', '모니터', '주변기기', '기타'],
        middle: ['AOS', 'iOS', '기타'],
        small: ['Galaxy Note 10+', 'iPhone 12', 'Macbook Pro', '기타'],
    });

    const [editCategory, setEditCategory] = useState<{ name: string; type: CategoryType } | null>(null);
    const [selectedLargeCategory, setSelectedLargeCategory] = useState<string | null>(null);
    //수정, 삭제 states
    const [selectedMiddleCategory, setSelectedMiddleCategory] = useState<string | null>(null);
    const [deleteCategory, setDeleteCategory] = useState<{ name: string; type: CategoryType } | null>(null);
    //추가 모달 상태
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [addCategory, setAddCategory] = useState<{ name: string; type: CategoryType } | null>(null);


    const handleCategoryClick = (e: React.MouseEvent, categoryName: string, categoryType: CategoryType) => {
        e.stopPropagation();
        // 카테고리 유형에 따라 상태를 다르게 업데이트
        if (categoryType === 'large') {
            setSelectedLargeCategory(categoryName);
            setSelectedMiddleCategory(null); // 중 카테고리 초기화
        } else if (categoryType === 'middle') {
            setSelectedMiddleCategory(categoryName);
        }
    };

    //수정 클릭 확인
    const handleEditClick = (e: React.MouseEvent, categoryName: string, categoryType: CategoryType) => {
        e.stopPropagation();
        setEditCategory({ name: categoryName, type: categoryType });
    };

    //삭제 클릭 확인
    const handleDeleteClick = (e: React.MouseEvent, categoryName: string, categoryType: CategoryType) => {
        e.stopPropagation();
        setDeleteCategory({ name: categoryName, type: categoryType }); // 삭제할 카테고리 설정
    };
    //추가 클릭 확인
    const handleAddClick = (categoryType: CategoryType) => {
        setAddCategory({ name: '', type: categoryType }); // 카테고리 추가 상태 설정
        setIsAddModalOpen(true); // 카테고리 추가 모달 열기
    };

    //수정내용 저장
    const handleSave = (updatedCategory: string, categoryType: CategoryType) => {
        // Save logic for updating category
        setCategories(prevCategories => {
            const updatedCategories = { ...prevCategories };
            if (categoryType === 'large') {
                updatedCategories.large = updatedCategories.large.map(cat => cat === editCategory?.name ? updatedCategory : cat);
            } else if (categoryType === 'middle') {
                updatedCategories.middle = updatedCategories.middle.map(cat => cat === editCategory?.name ? updatedCategory : cat);
            } else if (categoryType === 'small') {
                updatedCategories.small = updatedCategories.small.map(cat => cat === editCategory?.name ? updatedCategory : cat);
            }
            return updatedCategories;
        });
        setEditCategory(null);
    };

    //추가
    const handleAdd = (newCategory: string, categoryType: CategoryType) => {
        setCategories(prevCategories => {
            const updatedCategories = { ...prevCategories };
            updatedCategories[categoryType].push(newCategory);
            return updatedCategories;
        });
        setIsAddModalOpen(false); // 카테고리 추가 후 모달 닫기
    };

    //삭제
    const handleDelete = () => {
        if (deleteCategory) {
            setCategories(prevCategories => {
                const updatedCategories = { ...prevCategories };
                if (deleteCategory.type === 'large') {
                    updatedCategories.large = updatedCategories.large.filter(cat => cat !== deleteCategory.name);
                } else if (deleteCategory.type === 'middle') {
                    updatedCategories.middle = updatedCategories.middle.filter(cat => cat !== deleteCategory.name);
                } else if (deleteCategory.type === 'small') {
                    updatedCategories.small = updatedCategories.small.filter(cat => cat !== deleteCategory.name);
                }
                return updatedCategories;
            });
            setDeleteCategory(null);
        }
    };

    const handleCancel = () => {
        setEditCategory(null);
        setDeleteCategory(null);
        setIsAddModalOpen(false); //false면 모달 닫힘.
    };

    return (
        <div>
            <div className="category-panel">
                {/* 대 카테고리 */}
                <div className="category-column">
                    <div className="title">
                        <p>대 카테고리 </p>
                        <button className="category-btn" onClick={() => handleAddClick('large')} >등록하기</button>
                    </div>
                    <ul>
                        {categories.large.map((largeCategory_name: string, i: number) => {
                            return (
                                <li key={i}
                                    className={selectedLargeCategory === largeCategory_name ? 'selected' : ''}
                                    onClick={(e) => handleCategoryClick(e, largeCategory_name, 'large')}
                                >
                                    <span>{largeCategory_name}</span>
                                    <div className="button-group">
                                        <button onClick={(e) => handleEditClick(e, largeCategory_name, 'large')}>✎
                                        </button>
                                        <button onClick={(e) => handleDeleteClick(e, largeCategory_name, 'large')}>✖
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* 중 카테고리 (대 카테고리 선택 후 보여짐) */}
                {selectedLargeCategory && categories.middle.length > 0 && (
                    <div className="category-column">
                        <div className="title">
                            <p>중 카테고리 </p>
                            <button className="category-btn" onClick={() => handleAddClick('middle')} >등록하기</button>
                        </div>
                        <ul>
                            {categories.middle.map((middleCategory_name: string, i: number) => {
                                return (
                                    <li key={i}
                                        className={selectedMiddleCategory === middleCategory_name ? 'selected' : ''}
                                        onClick={(e) => handleCategoryClick(e, middleCategory_name, 'middle')}
                                    >
                                        <span>{middleCategory_name}</span>
                                        <div className="button-group">
                                            <button
                                                onClick={(e) => handleEditClick(e, middleCategory_name, 'middle')}>✎
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteClick(e, middleCategory_name, 'middle')}>✖
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* 소 카테고리 (중 카테고리 선택 후 보여짐) */}
                {selectedMiddleCategory && categories.small.length > 0 && (
                    <div className="category-column">
                        <div className="title">
                            <p>소 카테고리 </p>
                            <button className="category-btn" onClick={() => handleAddClick('small')} >등록하기</button>
                        </div>
                        <ul>
                            {categories.small.map((smallCategory_name: string, i: number) => {
                                return (
                                    <li key={i}
                                        onClick={(e) => handleCategoryClick(e, smallCategory_name, 'small')}
                                    >
                                        <span>{smallCategory_name}</span>
                                        <div className="button-group">
                                            <button onClick={(e) => handleEditClick(e, smallCategory_name, 'small')}>✎</button>
                                            <button onClick={(e) => handleDeleteClick(e, smallCategory_name, 'small')}>✖</button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>

            {/* 추가 모달 */}
            {isAddModalOpen && addCategory && (
                <CategoryAddModal
                    categoryType={addCategory.type}
                    onSave={handleAdd} // 카테고리 저장 함수
                    onCancel={handleCancel} // 취소 시 모달 닫는 함수
                />
            )}

            {/* 편집 모달 */}
            {editCategory && (
                <CategoryEditModal
                    category={editCategory.name}
                    categoryType={editCategory.type}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}

            {/* 삭제 모달 */}
            {deleteCategory && (
                <CategoryDeleteModal
                    category={deleteCategory.name}
                    categoryType={deleteCategory.type}
                    onDelete={handleDelete}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}

export default Category;
