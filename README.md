This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# DoGo_project

```
DoGo_project
├─ public
│  └─ images
│     ├─ clap.png
│     ├─ DoGo.png
│     ├─ DoGo_site_preview.webp
│     ├─ greee.webp
│     ├─ olheum.webp
│     └─ trid.webp
├─ README.md
├─ src
│  ├─ actions
│  │  └─ auth.ts
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ sign-in
│  │  │  │  ├─ actions
│  │  │  │  │  └─ login.ts
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ _components
│  │  │  │     ├─ FindIdModal.tsx
│  │  │  │     ├─ FindPasswordModal
│  │  │  │     │  ├─ FindPasswordModal.tsx
│  │  │  │     │  ├─ InputModal.tsx
│  │  │  │     │  ├─ ResetModal.tsx
│  │  │  │     │  └─ SuccessModal.tsx
│  │  │  │     ├─ KakaoSignIn.tsx
│  │  │  │     ├─ KaKaoUpdate.tsx
│  │  │  │     ├─ RoleBusiness.tsx
│  │  │  │     └─ RoleUser.tsx
│  │  │  └─ sign-up
│  │  │     ├─ actions
│  │  │     │  └─ handleSignupAction.ts
│  │  │     ├─ business
│  │  │     │  ├─ error.tsx
│  │  │     │  ├─ page.tsx
│  │  │     │  └─ _components
│  │  │     │     └─ SignUpBusiness.tsx
│  │  │     ├─ page.tsx
│  │  │     └─ user
│  │  │        ├─ error.tsx
│  │  │        ├─ page.tsx
│  │  │        └─ _components
│  │  │           └─ SignUpUser.tsx
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  ├─ find-id
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ find-password
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ kakao
│  │  │  │  │  └─ callback
│  │  │  │  │     └─ route.ts
│  │  │  │  ├─ reset-password
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ reset-password-request
│  │  │  │     └─ route.ts
│  │  │  ├─ favorites
│  │  │  │  └─ route.ts
│  │  │  ├─ hotel
│  │  │  │  └─ [id]
│  │  │  │     └─ route.ts
│  │  │  ├─ policy
│  │  │  │  └─ route.ts
│  │  │  ├─ review
│  │  │  │  └─ route.ts
│  │  │  ├─ rooms
│  │  │  │  └─ route.ts
│  │  │  └─ sign-up
│  │  │     ├─ business
│  │  │     │  └─ route.ts
│  │  │     └─ user
│  │  │        └─ route.ts
│  │  ├─ booking
│  │  │  └─ page.tsx
│  │  ├─ contact
│  │  │  └─ page.tsx
│  │  ├─ event
│  │  │  └─ page.tsx
│  │  ├─ global-error.tsx
│  │  ├─ hotel-list
│  │  │  ├─ page.tsx
│  │  │  ├─ [id]
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ _components
│  │  │  │     ├─ HotelAttraction.tsx
│  │  │  │     ├─ HotelBox.tsx
│  │  │  │     ├─ HotelFacility.tsx
│  │  │  │     ├─ HotelLocation.tsx
│  │  │  │     ├─ HotelOverview.tsx
│  │  │  │     ├─ HotelPolicies.tsx
│  │  │  │     ├─ HotelReviews.tsx
│  │  │  │     ├─ HotelRoom.tsx
│  │  │  │     └─ Navigation.tsx
│  │  │  └─ _components
│  │  │     ├─ AsideFilter.tsx
│  │  │     ├─ DualSlider.tsx
│  │  │     ├─ FacilityList.tsx
│  │  │     ├─ HotelsCardList.tsx
│  │  │     ├─ RenderStars.tsx
│  │  │     ├─ ServiceList.tsx
│  │  │     └─ SortBtn.tsx
│  │  ├─ layout.tsx
│  │  ├─ loading.tsx
│  │  ├─ my-page
│  │  │  ├─ admin
│  │  │  │  ├─ booking
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ company
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ cooperation
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ business
│  │  │  │  ├─ booking
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ BusinessLayout.tsx
│  │  │  │  ├─ hotel
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ inquiry
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ policy
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ profile
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ room
│  │  │  │     └─ page.tsx
│  │  │  ├─ Loading.tsx
│  │  │  ├─ user
│  │  │  │  ├─ booking
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ favorite
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ inquiry
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ profile
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ review
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ UserLayout.tsx
│  │  │  └─ _components
│  │  │     ├─ AdminSidebar.tsx
│  │  │     ├─ BookingList.tsx
│  │  │     ├─ BookingManagement.tsx
│  │  │     ├─ BookingsContent.tsx
│  │  │     ├─ BusinessHotelModal.tsx
│  │  │     ├─ BusinessSidebar.tsx
│  │  │     ├─ CompanyList.tsx
│  │  │     ├─ CooperationRequests.tsx
│  │  │     ├─ FavoritesContent.tsx
│  │  │     ├─ HotelManagement.tsx
│  │  │     ├─ InquiryManagement.tsx
│  │  │     ├─ PolicyManageMent.tsx
│  │  │     ├─ ProfileContent.tsx
│  │  │     ├─ ProfileManagement.tsx
│  │  │     ├─ ReviewsContent.tsx
│  │  │     ├─ RoomManageMent.tsx
│  │  │     ├─ SidebarWrapper.tsx
│  │  │     └─ UserSidebar.tsx
│  │  ├─ page.tsx
│  │  ├─ _components
│  │  │  ├─ ContentsList.tsx
│  │  │  ├─ EventSection.tsx
│  │  │  ├─ HeroSection.tsx
│  │  │  └─ _contents
│  │  │     ├─ HotelByLocation.tsx
│  │  │     ├─ HotelByView.tsx
│  │  │     ├─ HotelHistory.tsx
│  │  │     └─ Recommend.tsx
│  │  └─ _provider
│  │     ├─ AuthProvider.tsx
│  │     └─ provider.tsx
│  ├─ components
│  │  ├─ common
│  │  │  ├─ ErrorPage.tsx
│  │  │  └─ Example.tsx
│  │  ├─ layout
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Logo.tsx
│  │  │  └─ navigator
│  │  │     ├─ HamburgerBtn.tsx
│  │  │     └─ MyPageIcon.tsx
│  │  └─ ui
│  │     ├─ hotel-down-image
│  │     │  └─ Modal.tsx
│  │     ├─ hotel-review
│  │     │  └─ ReviewsModal.tsx
│  │     ├─ hotel-room
│  │     │  └─ Modal.tsx
│  │     ├─ hotel-up-image
│  │     │  └─ Modal.tsx
│  │     ├─ icon
│  │     │  ├─ BusinessIcon.tsx
│  │     │  ├─ CheckIcon.tsx
│  │     │  ├─ CloseButtonIcon.tsx
│  │     │  ├─ CloseEyesIcon.tsx
│  │     │  ├─ CopyAddressIcon.tsx
│  │     │  ├─ DividerIcon.tsx
│  │     │  ├─ DropDownIcon.tsx
│  │     │  ├─ DropUpIcon.tsx
│  │     │  ├─ FiCalendarIcon.tsx
│  │     │  ├─ FiChevronLeft.tsx
│  │     │  ├─ FiChevronLeftIcon.tsx
│  │     │  ├─ FiChevronRight.tsx
│  │     │  ├─ FiChevronRightIcon.tsx
│  │     │  ├─ HiOutlineMenuIcon.tsx
│  │     │  ├─ HiOutlineRefreshIcon.tsx
│  │     │  ├─ HiSearchIcon.tsx
│  │     │  ├─ IoCheckmarkCircle.tsx
│  │     │  ├─ IoCloseIcon.tsx
│  │     │  ├─ IoIosAddCircleOutlineIcon.tsx
│  │     │  ├─ IoIosRemoveCircleOutlineIcon.tsx
│  │     │  ├─ IoMdPinIcon.tsx
│  │     │  ├─ KaKaoIcon.tsx
│  │     │  ├─ LogoAuth.tsx
│  │     │  ├─ NearMeIcon.tsx
│  │     │  ├─ OpenEyesIcon.tsx
│  │     │  ├─ ParentIcon.tsx
│  │     │  ├─ PinIcon.tsx
│  │     │  ├─ RatingIcon.tsx
│  │     │  ├─ RenderStars.tsx
│  │     │  ├─ ReviewThumbUpIcon.tsx
│  │     │  ├─ RiThumbUpFillIcon.tsx
│  │     │  ├─ RunningIcon.tsx
│  │     │  ├─ SubwayIcon.tsx
│  │     │  ├─ UserIcon.tsx
│  │     │  └─ WarningIcon.tsx
│  │     ├─ MyCalendar.tsx
│  │     ├─ search
│  │     │  ├─ DetailsModal.tsx
│  │     │  ├─ DurationModal.tsx
│  │     │  ├─ LocationModal.tsx
│  │     │  ├─ ScrollSearchBox.tsx
│  │     │  └─ SearchBox.tsx
│  │     ├─ sign-up
│  │     │  └─ SignUpUi.tsx
│  │     ├─ skeleton
│  │     │  ├─ HotelBoxSkeleton.tsx
│  │     │  ├─ HotelListSkeleton.tsx
│  │     │  ├─ HotelNavigationSkeleton.tsx
│  │     │  ├─ HotelOverviewSkeleton.tsx
│  │     │  └─ SliderSkeletonUI.tsx
│  │     ├─ slider
│  │     │  ├─ HotelListSlider.tsx
│  │     │  └─ SlideCustomArrow.tsx
│  │     └─ Swal.tsx
│  ├─ constants
│  │  └─ constant.ts
│  ├─ fonts
│  │  └─ PretendardVariable.woff2
│  ├─ hooks
│  │  ├─ favorite
│  │  │  └─ useFavoriteStore.ts
│  │  ├─ formatCurrency
│  │  │  └─ useFormatCurrency.ts
│  │  ├─ hotel
│  │  │  ├─ useFacilities.ts
│  │  │  ├─ useFetchHotelsFilter.ts
│  │  │  ├─ useHotelDetail.ts
│  │  │  ├─ useHotels.ts
│  │  │  ├─ useHotelsByHistory.ts
│  │  │  ├─ useHotelsByLocation.ts
│  │  │  ├─ useHotelsByView.ts
│  │  │  └─ useServices.ts
│  │  ├─ map
│  │  │  └─ kakaomap.tsx
│  │  ├─ review
│  │  │  └─ useHotelReviews.ts
│  │  └─ room
│  │     └─ useHotelRooms.ts
│  ├─ middleware.ts
│  ├─ store
│  │  ├─ useAuth.ts
│  │  ├─ useHistoryStore.ts
│  │  ├─ useSearchHistoryStore.ts
│  │  └─ useSearchStore.ts
│  ├─ styles
│  │  └─ globals.css
│  ├─ supabase
│  │  ├─ middleware.ts
│  │  ├─ supabase-client.ts
│  │  ├─ supabase-server.ts
│  │  └─ supabase.ts
│  ├─ types
│  │  ├─ auth
│  │  │  └─ FindPasswordModalTypes.ts
│  │  ├─ hotel
│  │  │  ├─ hotel-box-type.ts
│  │  │  ├─ hotel-facility-type.ts
│  │  │  ├─ hotel-filter-type.ts
│  │  │  ├─ hotel-location.type.ts
│  │  │  ├─ hotel-overview-type.ts
│  │  │  ├─ hotel-policy-type.ts
│  │  │  ├─ hotel-review-type.ts
│  │  │  ├─ hotel-room-type.ts
│  │  │  ├─ navigation-type.ts
│  │  │  └─ user-type.ts
│  │  ├─ icon
│  │  │  └─ icon-type.ts
│  │  ├─ kakao.d.ts
│  │  ├─ slick
│  │  │  └─ slick-type.ts
│  │  ├─ supabase
│  │  │  ├─ answer-type.ts
│  │  │  ├─ booking-type.ts
│  │  │  ├─ contact-type.ts
│  │  │  ├─ facilities-type.ts
│  │  │  ├─ favorite-type.ts
│  │  │  ├─ hotel-type.ts
│  │  │  ├─ policy-type.ts
│  │  │  ├─ review-type.ts
│  │  │  ├─ room-type.ts
│  │  │  ├─ services-type.ts
│  │  │  ├─ supabase-sign-up-type.ts
│  │  │  ├─ supabase-type.ts
│  │  │  └─ user-type.ts
│  │  └─ zustand
│  │     ├─ auth-state-type.ts
│  │     ├─ history-state-type.ts
│  │     └─ search-state-type.ts
│  └─ utils
│     ├─ fetchFacilities.ts
│     ├─ fetchHotelsByLocation.ts
│     ├─ fetchHotelsByView.ts
│     ├─ fetchHotelsFilter.ts
│     ├─ fetchServices.ts
│     ├─ urlCalculator.ts
│     └─ urlHelpers.ts
├─ supabase
│  ├─ .gitignore
│  └─ config.toml
├─ tailwind.config.ts
└─ tsconfig.json

```