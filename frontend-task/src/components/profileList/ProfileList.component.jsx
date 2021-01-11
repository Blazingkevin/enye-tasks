import React, { useState, useEffect } from 'react';
import ProfileCard from '../profileCard/ProfileCard.component';
import './ProfileList.styles.scss';

import Pagination from '../pagination/Pagination.component';
import Filter from '../filter/Filter.component';
import Search from '../search/Search.component';



export default () => {
    const [profileList, setProfileList] = useState({
        all: [],
        pageProfiles: [],
        page: 1,
        filteredProfiles: [],
        filterOPtions: {},
        emptyResult: false
    })

    useEffect(() => {
        let mounted = true;
        fetch('http://api.enye.tech/v1/challenge/records')
            .then(response => response.json())
            .then(data => {
                updateProfileListBasedOnPage(1, data.records.profiles);
            });
        return () => mounted = false;
    }, [])

    const updateProfileListBasedOnPage = (pageNumber, allProfile, filteredProfiles, clearFilter) => {
        const start = (pageNumber - 1) * 20;
        const end = start + 20;

        // special case - if it is requiered to clear the filtered profile
        if (clearFilter) {
            const profiles = profileList.all.slice(start, end)
            setProfileList({
                all: profileList.all,
                pageProfiles: profiles,
                page: pageNumber,
                filteredProfiles: [],
                filterOPtions: profileList.filterOPtions
            })
            return;
        }


        if (filteredProfiles) {
            // if filtered profile was passed to the function, update state accordingly set default page to 1
            const profiles = filteredProfiles.slice(0, 20);
            setProfileList({
                all: profileList.all,
                pageProfiles: profiles,
                page: 1,
                filteredProfiles: filteredProfiles,
                filterOPtions: profileList.filterOPtions
            })

        }
        else if (profileList.filteredProfiles != 0) {
            const profiles = profileList.filteredProfiles.slice(start, end)
            setProfileList({
                all: profileList.all,
                pageProfiles: profiles,
                page: pageNumber,
                filteredProfiles: profileList.filteredProfiles,
                filterOPtions: profileList.filterOPtions
            })
        }
        else if (allProfile) {
            // the first time the components loads, use the complete profile list
            //  Also, set the filterOptions
            if (allProfile.length == 0) return
            const profiles = allProfile.slice(start, end);
            const _filterOptions = { PaymentMethod: new Set(), Gender: new Set() };
            allProfile.forEach(profile => {
                _filterOptions.PaymentMethod.add(profile.PaymentMethod);
                _filterOptions.Gender.add(profile.Gender);
            })

            setProfileList({
                all: allProfile,
                pageProfiles: profiles,
                page: profileList.page,
                filteredProfiles: [],
                filterOPtions: _filterOptions
            });
        }
        else {
            const profiles = profileList.all.slice(start, end)
            setProfileList({
                all: profileList.all,
                pageProfiles: profiles,
                page: pageNumber,
                filteredProfiles: [],
                filterOPtions: profileList.filterOPtions
            })
        }
    }

    // filters the profile list based on search term or filter object
    const filter = (filter_obj, searchterm) => {
        console.log("search term: ", searchterm)
        if (searchterm == '') {
            // if the search term is an empty string, clear the filteredList
            updateProfileListBasedOnPage(1, null, null, true);
        }
        if (searchterm) {
            // if a filter option has been selected, use the objects available for that filter option
            const newProfileList = profileList.all.filter(profile => {
                return profile.FirstName.toLowerCase().includes(searchterm.toLowerCase()) || profile.LastName.toLowerCase().includes(searchterm.toLowerCase());
            })
            if (newProfileList.length == 0) {
                setProfileList({
                    ...profileList,
                    emptyResult: true
                })
                return
            }
            updateProfileListBasedOnPage(null, null, newProfileList);

        }


        if (filter_obj) {
            // if the operaition to perform is a filter operation
            // filter the profiles based on the given field name and its value
            const { fieldName, value } = filter_obj
            const newProfileList = profileList.all.filter(profile => {
                return profile[fieldName] == value;
            });

            updateProfileListBasedOnPage(null, null, newProfileList)
        }
    }


    if (profileList.all.length == 0) {
        return <div>loading...</div>
    }
    else {
        return (
            <div className="profile_list">
                <div className="top-container">
                    <div className="container filter-container">
                        <p>Filter:</p>
                        <Filter filter={filter} options={profileList.filterOPtions} />
                    </div>
                    <div className="container search-container">
                        <p>Search:</p>
                        <Search filter={filter} />
                    </div>


                </div>
                {
                    profileList.emptyResult ?
                        <div>No result</div> :
                        <div className="list-wrapper">
                            <Pagination
                                totalNumberOfItems={profileList.filteredProfiles != 0 ? profileList.filteredProfiles.length : profileList.all.length}
                                currentPage={profileList.page}
                                updatePage={updateProfileListBasedOnPage} />
                            {profileList.pageProfiles.map((profile, index) => <ProfileCard profileData={profile} key={index} />)}
                            <Pagination
                                totalNumberOfItems={profileList.filteredProfiles.length != 0 ? profileList.filteredProfiles.length : profileList.all.length}
                                currentPage={profileList.page}
                                updatePage={updateProfileListBasedOnPage} />
                        </div>

                }

            </div>
        )
    }

}