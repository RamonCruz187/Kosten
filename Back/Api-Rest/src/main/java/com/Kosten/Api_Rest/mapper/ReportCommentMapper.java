package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.ReportComment.ReportCommentDto;
import com.Kosten.Api_Rest.dto.ReportComment.ReportCommentRequestDto;
import com.Kosten.Api_Rest.model.ReportComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ReportCommentMapper {
    @Mapping(target = "comment", ignore = true)
    ReportComment toEntity(ReportCommentDto reportCommentDto);

    @Mapping(target = "comment", ignore = true)
    ReportComment toEntity(ReportCommentRequestDto reportCommentRequestDto);

    @Mapping(source = "comment.id", target = "idComment")
    ReportCommentDto toDto(ReportComment reportComment);

    List<ReportCommentDto> entityListToDtoList(List<ReportComment> reportCommentList);
}
