## 프로젝트: DoGo
 🔗 Live Demo : [do-go-project.vercel.app/](https://do-go-project.vercel.app/)

![Tech Stack](https://oopy.lazyrockets.com/api/v2/notion/image?src=attachment%3Ab4927a29-6e07-4c02-a399-ba028450102f%3AUntitled-1.png&blockId=ebb61c22-29a5-4dd4-a372-031aa2a07dba)



## 목차
1. [프로젝트 소개]
2. [팀원 소개]
2. [주요 기능]
3. [기술 스택]
4. [렌더링 방식]



## 프로젝트 소개
DoGo는 사용자와 숙박 제공자를 연결하는 통합 숙박 예약 플랫폼으로, 간편한 숙소 검색, 예약, 결제 기능을 제공합니다. 또한 사업자가 직접 숙소를 등록하고 관리할 수 있는 기능을 포함하여, 사용자와 숙박 제공자 모두에게 편리한 서비스를 제공합니다.


## 팀원소개

|최민석|서지안|박우석|최한솔|정설화|
|:---:|:---:|:---:|:---:|:---:|
|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFaThB%2FbtsL9OMyXWu%2FTmxOv0ndyOikvfUMPFXum0%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCyxJX%2FbtsL8GWkId3%2FHcketKmGejF9MaaI6Jyxz1%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdiupAp%2FbtsL8Is7Y2l%2FHc9AkaOzK3Ca9r6y9jtneK%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbIbmbA%2FbtsL8ZBk8HD%2Fwpky53KwDa6dsNPMa949q0%2Fimg.png)|![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLDvKA%2FbtsMaliRLM4%2FoUMVSKu2tCkcwFFjY7uU21%2Fimg.png)|
|팀장|부팀장|팀원|팀원|디자이너|
|스키마관리, 레이아웃, 메인페이지, 검색창, 필터, 예약페이지, 결제페이지|마이페이지|호텔리스트, 호텔상세페이지|로그인, 회원가입, 문의하기|모바일 UI/UX 디자이너|

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

## 주요 기능
### 🔐Auth
🔓로그인
- supabase sign ➡️
- Kakao Social Login ➡️

🔒회원가입
- User (고객) ➡️ 
- business (판매자) ➡️
- admin (홈페이지 관리자) ➡️

❓계정 & 비밀번호 찾기
- 계정 찾기 ➡️
- 비밀번호 찾기 ➡️

### 👤MyPage
👪사용자 페이지 (user)
- 프로필 관리 ➡️ 사용자의 회원가입정보를 볼수 있으며 프로필 이미지, 닉네임, 휴대폰 번호를 변경할 수 있다.
- 예약 목록 ➡️ 사용자가 예약한 호텔 정보를 볼수 있다.
- 찜 목록
- 작성한 후기 & 후기 작성하기
- 1:1 문의 ➡️ 문의 내역을 확인 할수 있다.

🧑‍🦰판매자 페이지 (business)
- 호텔 등록 ➡️
- 문의 관리 ➡️
- 예약 관리 ➡️

👩‍💼관리자 페이지 (admin)
- 업체 리스트 ➡️
- 협력 요청 ➡️
- 예약 리스트 ➡️

### 🏠Home
- 히스토리 ➡️ 사용자가 이전에 봤던 호텔 목록을 확인할 수 있습니다.
- 호텔 캐러셀 ➡️ 각 지역 또는 전망에 해당하는 호텔 목록을 최대 10개까지 사용자에게 보여줍니다.

### 🔍 필터
- 검색 ➡️ 검색창을 통해 입력된 데이터를 토대로 호텔 리스트 페이지에 보여줄 수 있습니다.
- 필터 ➡️ 

### 🏨Hotel List
- 호텔 리스트 ➡️ 검색창에서 입력한 지역, 동네, 이름 정보를 기반으로 해당하는 호텔 목록을 표시합니다.
- 필터 ➡️  URL을 활용하여 필터 조건을 적용, 사용자가 원하는 호텔 리스트만 볼 수 있도록 구현했습니다.
- 즐겨찾기 ➡️ zustand를 사용해 즐겨찾기 상태를 관리하고, supabase와 연결하여 상태를 동기화시켜 사용자가 즐겨찾기 버튼을 누르면 zustand에서 상태를 업데이트하고, 동시에 supabase에도 반영되도록 처리해 사용자가 원하는 호텔을 저장할수 있으며, 또한 Hock으로 분리하여 재사용성을 높였습니다.
- 무한 스크롤 ➡️ 숙소 리스트를 불러올 때 무한 스크롤 기능을 적용하여, 모든 테이터를 한 번에 불러오는 부담을 줄이고, 사용자가 스크롤할 때 일정 데이터만 추가 되도록 구현했습니다. 이를 위해 React Query를 활용하여 데이터를 비동기적으로 가져오고, Intersection Observer를 사용해 사용자가 리스트 하단에 도달할 때 fetchNextPage를 호출하여 추가 데이터를 불러오도록 했습니다. 이 방식으로 불필요한 네트워크 요청을 최소화하고, 부드러운 사용자 경험을 제공할 수 있도록 하였습니다.

### 🛌Hotel Detail Page
- 호텔 상세 정보 ➡️ 호텔의 ID 값을 기반으로 해당 호텔의 상세 페이지를 제공하며, 모든 호텔 정보를 확인할 수 있습니다.
- 지도 ➡️ Kakao map api에서 geocoder를 사용해 주소값을 위도와 경도로 변환하여 그 위치에 맞는 값을 화면에 보여주도록 했습니다.
- 즐겨찾기 ➡️ 분리한 Custom Hock을 사용하여 즐겨찾기 기능을 재사용했습니다.
- 예약하기 ➡️ Toss Payments를 활용하여 가상 결제 기능을 구현했으며, 실제 결제 프로세스와 유사한 UI 및 결제 과정을 경험할 수 있습니다.

### 🗓Booking
- 헤더 ➡️
- 푸터 ➡️
- 문의하기 ➡️

## 랜더링 방식 
### 📌Sign in / Sign up - CSR ( server actions , middleware )
- 보안 강화를 위해 로그인 처리는 서버에서 진행하고, Middleware로 접근을 제어하며, Zustand의 자동 로그인 상태 관리(setAuth)를 적용했습니다.
- 이렇게 하면 클라이언트에서 민감한 정보가 노출되지 않고, 유지보수도 편리해지며, 로그인 상태가 자동으로 업데이트됩니다.
### 📌MyPage - CSR
- 마이페이지는 개인화된 데이터를 다루며 SEO가 필요 없는 페이지이기 때문에, 클라이언트에서 데이터를 불러와 즉시 렌더링할 수 있는 CSR을 사용했습니다.
### 📌Home - SSR
- Home 페이지는 SEO 최적화와 초기 로딩 속도를 개선하기 위해 SSR을 사용했습니다.
- 검색 기능의 빠른 응답을 위해 서버에서 데이터를 미리 가져와 즉시 렌더링하도록 구현했습니다.
### 📌Hotel List - CSR
- 호텔 리스트 페이지는 유저가 필터랑, 정렬, 무한 스크롤을 사용하며 지속적으로 데이터를 갱신해야 되는 페이지 입니다. CSR은 유연하게 상태를 관리할 수 있고, 빠른 인터랙션과 캐싱을 활용한 최적화가 가능했기에 선택했습니다.
- 초기 렌더링 속도가 느려지는 단점이 있지만, Skeleton UI를 활용하여 사용자 경험을 개선했습니다.
### 📌Hotel Detail - CSR
- 호텔 상세 페이지는 유저별  즐겨찾기,리뷰,로그인 같은 동적 상태가 많기에 서버에서 랜더링할 필요를 크지 않다고 판단하여 CSR을 선택했습니다.
- 초기 렌더링 속도가 느려지는 단점이 있지만, Skeleton UI를 활용하여 사용자 경험을 개선했습니다.

### 📌Bookibng - CSR
- 예약 및 결제 페이지는 빠른 UX, 실시간 UI 업데이트, 그리고 보안성을 고려해야 하는데, CSR을 사용하면 즉각적인 UI 업데이트가 가능하고, 결제 정보는 서버에서만 처리되므로 보안 문제도 해결됩니다.

## 기술 스택
⭐ **Language**
<br>
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

⭐ **Front-end & Libraries**
<br>
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FullCalendar](https://img.shields.io/badge/FullCalendar-4285F4?style=for-the-badge&logo=google-calendar&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-%23007ACC.svg?style=for-the-badge&logo=zustand&logoColor=white)  
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)  
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-ffcc00?style=for-the-badge&logo=javascript&logoColor=black)  
![Slick Carousel](https://img.shields.io/badge/Slick%20Carousel-2A2A2A?style=for-the-badge&logo=react&logoColor=%2361DAFB)


⭐ **Back-emd**
<br>
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

⭐ **DevOps & Deployment**
<br>
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

⭐ **Version Control**
<br>
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

⭐ **API**
<br>
![Kakao Map](https://img.shields.io/badge/Kakao%20Map-FFCD00?style=flat-square&logo=Kakao&logoColor=white)
![Kakao Developers](https://img.shields.io/badge/Kakao%20Developers-FFCD00?style=flat-square&logo=Kakao&logoColor=black)
![Toss Payments](https://img.shields.io/badge/Toss%20Payments-0051C7?style=flat-square&logo=Toss&logoColor=white)


## ERD
| ![Database Schema 1](https://github.com/user-attachments/assets/e2fa088c-810b-4a50-8d1c-cc4ea8917f10)|
|--------------------------------------|
| ![Database Schema 2](https://github.com/user-attachments/assets/8add5108-d68c-40b9-8145-0995acc18eb6)|
