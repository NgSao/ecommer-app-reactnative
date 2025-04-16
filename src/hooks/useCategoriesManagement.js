import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { api } from '@service/apiAdmin';

const useCategoriesManagement = () => {
    const navigation = useNavigation()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredCategories, setFilteredCategories] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [categoryName, setCategoryName] = useState("")
    const [categoryImage, setCategoryImage] = useState(null)
    const [categoryParent, setCategoryParent] = useState(null)
    const [savingCategory, setSavingCategory] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [sortBy, setSortBy] = useState("name")
    const [sortOrder, setSortOrder] = useState("asc")

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredCategories(categories)
        } else {
            const filtered = categories.filter((category) =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredCategories(filtered)
        }
    }, [searchQuery, categories])

    const fetchCategories = async (pageNum = 1) => {
        setLoading(pageNum === 1)
        try {
            const response = await api.admin.getCategories({ page: pageNum, limit: 20 })
            if (response.success) {
                const newCategories = pageNum === 1 ? response.data : [...categories, ...response.data]
                const sortedCategories = sortCategories(newCategories, sortBy, sortOrder)
                setCategories(sortedCategories)
                setFilteredCategories(sortedCategories)
                setHasMore(response.data.length === 20)
            } else {
                Alert.alert("Lỗi", "Không thể tải danh sách danh mục")
            }
        } catch (error) {
            console.error("Error fetching categories:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải danh sách danh mục")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchCategories(nextPage)
        }
    }

    const sortCategories = (categoriesToSort, criteria, order) => {
        return [...categoriesToSort].sort((a, b) => {
            if (criteria === "name") {
                return order === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            } else if (criteria === "productCount") {
                return order === "asc"
                    ? a.productCount - b.productCount
                    : b.productCount - a.productCount
            }
            return 0
        })
    }

    const handleSort = (criteria) => {
        const newOrder = sortBy === criteria && sortOrder === "asc" ? "desc" : "asc"
        setSortBy(criteria)
        setSortOrder(newOrder)

        const sortedCategories = sortCategories(categories, criteria, newOrder)
        setCategories(sortedCategories)
        setFilteredCategories(
            searchQuery.trim() === ""
                ? sortedCategories
                : sortedCategories.filter((category) =>
                    category.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
        )
    }

    const onRefresh = () => {
        setRefreshing(true)
        setPage(1)
        fetchCategories(1)
    }

    const handleAddCategory = () => {
        setEditingCategory(null)
        setCategoryName("")
        setCategoryImage(null)
        setCategoryParent(null)
        setModalVisible(true)
    }

    const handleEditCategory = (category) => {
        setEditingCategory(category)
        setCategoryName(category.name)
        setCategoryImage(category.image)
        setCategoryParent(category.parentId)
        setModalVisible(true)
    }

    const handleDeleteCategory = (categoryId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa danh mục này không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await api.admin.deleteCategory(categoryId)
                            if (response.success) {
                                const updatedCategories = categories.filter(
                                    (category) => category.id !== categoryId
                                )
                                setCategories(updatedCategories)
                                setFilteredCategories(updatedCategories)
                                Alert.alert("Thành công", "Đã xóa danh mục")
                            } else {
                                Alert.alert("Lỗi", response.error || "Không thể xóa danh mục")
                            }
                        } catch (error) {
                            console.error("Error deleting category:", error)
                            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa danh mục")
                        }
                    },
                },
            ],
            { cancelable: true }
        )
    }

    const handleViewProducts = (categoryId) => {
        navigation.navigate("AdminProductsManagement", { categoryId })
    }

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            })

            if (!result.canceled) {
                setCategoryImage(result.assets[0].uri)
            }
        } catch (error) {
            console.error("Error picking image:", error)
            Alert.alert("Lỗi", "Không thể chọn hình ảnh")
        }
    }

    const saveCategory = async () => {
        if (!categoryName.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên danh mục")
            return
        }

        setSavingCategory(true)
        try {
            let response
            if (editingCategory) {
                response = await api.admin.updateCategory(editingCategory.id, {
                    name: categoryName,
                    image: categoryImage,
                    parentId: categoryParent,
                })
            } else {
                response = await api.admin.createCategory({
                    name: categoryName,
                    image: categoryImage,
                    parentId: categoryParent,
                })
            }

            if (response.success) {
                setModalVisible(false)
                setPage(1)
                fetchCategories(1)
                Alert.alert("Thành công", editingCategory ? "Đã cập nhật danh mục" : "Đã thêm danh mục mới")
            } else {
                Alert.alert("Lỗi", response.error || "Không thể lưu danh mục")
            }
        } catch (error) {
            console.error("Error saving category:", error)
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu danh mục")
        } finally {
            setSavingCategory(false)
        }
    }

    const handleSelectParentCategory = () => {
        const parentCategories = categories.filter(
            (c) => !c.parentId && (!editingCategory || c.id !== editingCategory.id)
        )
        if (parentCategories.length === 0) {
            Alert.alert("Thông báo", "Không có danh mục cha nào khả dụng")
            return
        }

        Alert.alert(
            "Chọn danh mục cha",
            "Chọn một danh mục hoặc bỏ qua nếu đây là danh mục chính",
            [
                { text: "Bỏ qua", onPress: () => setCategoryParent(null) },
                ...parentCategories.map((cat) => ({
                    text: cat.name,
                    onPress: () => setCategoryParent(cat.id),
                })),
            ]
        )
    }

    return {
        navigation,
        categories,
        loading,
        refreshing,
        searchQuery,
        setSearchQuery,
        filteredCategories,
        modalVisible,
        setModalVisible,
        editingCategory,
        categoryName,
        setCategoryName,
        categoryImage,
        setCategoryImage,
        categoryParent,
        setCategoryParent,
        savingCategory,
        onRefresh,
        loadMore,
        hasMore,
        sortBy,
        sortOrder,
        handleSort,
        handleAddCategory,
        handleEditCategory,
        handleDeleteCategory,
        handleViewProducts,
        pickImage,
        saveCategory,
        handleSelectParentCategory,
    }
}

export default useCategoriesManagement