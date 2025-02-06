## 프로젝트: DoGo


## 프로젝트 소개
DoGo는 사용자와 숙박 제공자를 연결하는 통합 숙박 예약 플랫폼으로, 간편한 숙소 검색, 예약, 결제 기능을 제공합니다. 또한 사업자가 직접 숙소를 등록하고 관리할 수 있는 기능을 포함하여, 사용자와 숙박 제공자 모두에게 편리한 서비스를 제공합니다.


## 팀원소개

|최민석|서지안|박우석|최한솔|정설화|
|:---:|:---:|:---:|:---:|:---:|
|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFaThB%2FbtsL9OMyXWu%2FTmxOv0ndyOikvfUMPFXum0%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCyxJX%2FbtsL8GWkId3%2FHcketKmGejF9MaaI6Jyxz1%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdiupAp%2FbtsL8Is7Y2l%2FHc9AkaOzK3Ca9r6y9jtneK%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbIbmbA%2FbtsL8ZBk8HD%2Fwpky53KwDa6dsNPMa949q0%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLDvKA%2FbtsMaliRLM4%2FoUMVSKu2tCkcwFFjY7uU21%2Fimg.png)|
|팀장|부팀장|팀원|팀원|디자이너|
|레이아웃, 메인페이지, 검색창, 필터|마이페이지|호텔리스트, 호텔상세페이지|로그인, 회원가입, 문의하기|모바일 UI/UX 디자이너|

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
├─ src
│  ├─ actions
│  │  └─ auth.ts
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ layout.tsx
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
│  │  │  │     └─ KaKaoUpdate.tsx
│  │  │  └─ sign-up
│  │  │     ├─ actions
│  │  │     │  └─ handleSignupAction.ts
│  │  │     ├─ business
│  │  │     │  ├─ error.tsx
│  │  │     │  ├─ page.tsx
│  │  │     │  └─ _components
│  │  │     │     ├─ BusinessInputField.tsx
│  │  │     │     └─ SignUpBusiness.tsx
│  │  │     ├─ page.tsx
│  │  │     └─ user
│  │  │        ├─ error.tsx
│  │  │        ├─ page.tsx
│  │  │        └─ _components
│  │  │           ├─ InputField.tsx
│  │  │           ├─ InputPassword.tsx
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
│  │  │  ├─ inquiries
│  │  │  │  └─ route.ts
│  │  │  ├─ payments
│  │  │  │  └─ verify.ts
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
│  │  │  ├─ fail
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ [id]
│  │  │  │  └─ page.tsx
│  │  │  └─ _components
│  │  │     ├─ AgreementAndPayment .tsx
│  │  │     ├─ ContactInfo.tsx
│  │  │     ├─ Requests.tsx
│  │  │     ├─ Sidebar.tsx
│  │  │     └─ TossPaymentsButton.tsx
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
│  │  │     ├─ AppliedFilters.tsx
│  │  │     ├─ AsideFilter.tsx
│  │  │     ├─ BedTypeList.tsx
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
│  │  │  │  ├─ inquiry
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ business
│  │  │  │  ├─ booking
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ hotel
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ inquiry
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ layout.tsx
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
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ profile
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ review
│  │  │  │     ├─ page.tsx
│  │  │  │     └─ write
│  │  │  │        └─ page.tsx
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
│  │  │     ├─ InquiryList.tsx
│  │  │     ├─ InquiryManagement.tsx
│  │  │     ├─ InquiryModal.tsx
│  │  │     ├─ PolicyManageMent.tsx
│  │  │     ├─ ProfileContent.tsx
│  │  │     ├─ ProfileManagement.tsx
│  │  │     ├─ ReviewsContent.tsx
│  │  │     ├─ RoomManageMent.tsx
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
│  │  │  ├─ Example.tsx
│  │  │  └─ InquiryFloatingButton.tsx
│  │  ├─ layout
│  │  │  ├─ AuthHeader.tsx
│  │  │  ├─ ClientWrapper.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Logo.tsx
│  │  │  └─ navigator
│  │  │     ├─ HamburgerBtn.tsx
│  │  │     └─ MyPageIcon.tsx
│  │  └─ ui
│  │     ├─ hotel-mobile
│  │     │  └─ modal.tsx
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
│  │     │  ├─ DownIcon.tsx
│  │     │  ├─ DropDownIcon.tsx
│  │     │  ├─ DropUpIcon.tsx
│  │     │  ├─ FiCalendarIcon.tsx
│  │     │  ├─ FiChevronLeft.tsx
│  │     │  ├─ FiChevronLeftIcon.tsx
│  │     │  ├─ FiChevronRight.tsx
│  │     │  ├─ FiChevronRightIcon.tsx
│  │     │  ├─ FileIcon.tsx
│  │     │  ├─ GoBackIcon.tsx
│  │     │  ├─ HiOutlineMenuIcon.tsx
│  │     │  ├─ HiOutlineRefreshIcon.tsx
│  │     │  ├─ HiSearchIcon.tsx
│  │     │  ├─ InstanceIcon.tsx
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
│  │     │  ├─ RefreshIcon.tsx
│  │     │  ├─ RenderStars.tsx
│  │     │  ├─ ReviewThumbUpIcon.tsx
│  │     │  ├─ RiThumbUpFillIcon.tsx
│  │     │  ├─ RunningIcon.tsx
│  │     │  ├─ SubwayIcon.tsx
│  │     │  ├─ UserIcon.tsx
│  │     │  └─ WarningIcon.tsx
│  │     ├─ inquiry
│  │     │  ├─ InquiryCategory.tsx
│  │     │  ├─ InquiryForm.tsx
│  │     │  └─ InquiryModal.tsx
│  │     ├─ search
│  │     │  ├─ details
│  │     │  │  └─ DetailsModal.tsx
│  │     │  ├─ duration
│  │     │  │  ├─ ActionButton.tsx
│  │     │  │  ├─ CalendarForm.tsx
│  │     │  │  ├─ DurationModal.tsx
│  │     │  │  ├─ DurationTab.tsx
│  │     │  │  └─ FlexibleForm.tsx
│  │     │  ├─ location
│  │     │  │  └─ LocationModal.tsx
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
│  │  ├─ booking
│  │  │  ├─ useFetchBookingData.ts
│  │  │  ├─ useHotelNameAndRoomName.ts
│  │  │  └─ usePostBookingData.ts
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
│  │  ├─ room
│  │  │  ├─ useHotelRooms.ts
│  │  │  └─ useRoomsData.ts
│  │  └─ user
│  │     └─ useUserData.ts
│  ├─ middleware.ts
│  ├─ store
│  │  ├─ useAuth.ts
│  │  ├─ useHistoryStore.ts
│  │  ├─ useSearchHistoryStore.ts
│  │  └─ useSearchStore.ts
│  ├─ styles
│  │  ├─ calendar.css
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
│     ├─ api
│     │  ├─ fetch
│     │  │  ├─ fetchBookingData.ts
│     │  │  ├─ fetchBookingHotelNameAndRoomName.ts
│     │  │  ├─ fetchFacilities.ts
│     │  │  ├─ fetchHotelsByLocation.ts
│     │  │  ├─ fetchHotelsByView.ts
│     │  │  ├─ fetchHotelsFilter.ts
│     │  │  ├─ fetchRoomsData.ts
│     │  │  ├─ fetchServices.ts
│     │  │  └─ fetchUserData.ts
│     │  └─ post
│     │     └─ postBookingData.ts
│     └─ calculator
│        ├─ dateCalculator.ts
│        ├─ randomStayDatesCalculator.ts
│        ├─ urlCalculator.ts
│        ├─ urlHelpers.ts
│        └─ validation.ts
├─ supabase
│  ├─ .gitignore
│  ├─ .temp
│  │  └─ cli-latest
│  └─ config.toml
├─ tailwind.config.ts
└─ tsconfig.json


```
