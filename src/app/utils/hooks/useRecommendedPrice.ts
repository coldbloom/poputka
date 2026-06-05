import { useEffect, useState } from 'react';
import { RouteDetails } from "@/utils/types";

const FUEL_PRICE_PER_LITER = 55;
const TIME_COST_PER_HOUR = 300;
const PRICE_FACTORS = { min: 0.85, max: 1.35 };

type RecommendedPrice = {
  min: string;
  max: string;
} | null;

const getDistanceToKm = (routeDetails: RouteDetails): number =>
  Math.round(routeDetails?.distance / 1000);

const roundToNearestTen = (number: number): number =>
  Math.round(number / 10) * 10;

const generateRecommendedPrice = (routeDetails: RouteDetails, factor: number = 1): number => {
  const distanceKm = getDistanceToKm(routeDetails);
  const fuelCost = (distanceKm / 100) * 10 * FUEL_PRICE_PER_LITER;
  const timeCost = Math.round(routeDetails.duration / 3600) * TIME_COST_PER_HOUR;
  const recommendedPrice = Math.round((fuelCost + timeCost) / 3);
  return roundToNearestTen(recommendedPrice * factor);
};

export const useRecommendedPrice = (
  routeDetails: RouteDetails | undefined,
  onUpdateRecommendedPrice?: (price: string) => void
) => {
  const [recommendedPrice, setRecommendedPrice] = useState<RecommendedPrice>(null);

  // Обновляем цену и рекомендуемую цену при изменении routeDetails
  useEffect(() => {
    if (routeDetails) {
      const price = String(generateRecommendedPrice(routeDetails));
      const minPrice = String(generateRecommendedPrice(routeDetails, PRICE_FACTORS.min));
      const maxPrice = String(generateRecommendedPrice(routeDetails, PRICE_FACTORS.max));

      onUpdateRecommendedPrice?.(price);
      setRecommendedPrice({ min: minPrice, max: maxPrice });
    }
  }, [routeDetails]);

  return recommendedPrice;
};