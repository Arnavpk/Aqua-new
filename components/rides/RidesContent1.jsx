import { FeaturedRides } from '../FeaturedRides';
import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractFeaturedRides } from '@/lib/extractors/featuredRidesExtractor';

import { RIDE_DETAILS } from '@/lib/data/rideDetails';
import { RideDetailsTable } from './RidesDetailsTable';

export async function RidesContent1({ params }) {
    const location = getLocation(params.location);
    const homePage = await getPage(location.slug, 'pages', 'home');
    const featuredRides = homePage ? extractFeaturedRides(homePage) : null;

    const zones = RIDE_DETAILS[location.slug] || [];

    return (
        <>
            <FeaturedRides locationSlug={location.slug} data={featuredRides} />
            <RideDetailsTable zones={zones} />
        </>
    );
}