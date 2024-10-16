package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.staff.StaffRequestDto;
import com.Kosten.Api_Rest.dto.staff.StaffResponseDto;
import com.Kosten.Api_Rest.dto.staff.StaffToUpdateDto;
import com.Kosten.Api_Rest.model.Image;
import com.Kosten.Api_Rest.model.Staff;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper
public interface StaffMapper {

    @Mapping(source= "photo", target = "photo", qualifiedByName = "imageToUrl")
    StaffResponseDto toDto(Staff staff);

    @Named("imageToUrl")
    default String imageToUrl(Image image) {
        return (image != null) ? image.getUrl() : null;
    }

    @Mapping(target = "photo", source = "image")
    Staff toEntity(StaffRequestDto staffRequestDto, Image image);

    //Staff toEntity(StaffToUpdateDto staffToUpdateDto);
}
