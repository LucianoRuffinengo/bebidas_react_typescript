import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice"
import { createFavoriteSlice, FavoritesSliceTypes } from "./favoriteSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificatioSlice"

export const useAppStore = create<RecipesSliceType & FavoritesSliceTypes & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
})))