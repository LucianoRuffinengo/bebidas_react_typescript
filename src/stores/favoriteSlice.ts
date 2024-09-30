import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createNotificationSlice, NotificationSliceType } from "./notificatioSlice"
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice"

export type FavoritesSliceTypes = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoriteSlice : StateCreator<FavoritesSliceTypes & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceTypes> = (set, get, api) => ({
    favorites : [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)){
            set((state) => ({
                favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se elimino de favoritos', 
                error: false,
            })
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agrego a favoritos', 
                error: false,
            })
        }
        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage:() => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})