package com.Kosten.Api_Rest.mapper;

import com.Kosten.Api_Rest.dto.comment.CPackageResponse;
import com.Kosten.Api_Rest.dto.comment.CommentDto;
import com.Kosten.Api_Rest.dto.comment.CommentRequestDto;
import com.Kosten.Api_Rest.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "packageRef", ignore = true)
    Comment toEntity(CommentDto commentDto);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "packageRef", ignore = true)
    Comment toEntity(CommentRequestDto commentRequestDto);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "packageRef.id", target = "packageId")
    CommentDto toDto(Comment comment);

    @Mapping(source = "comment", target = "commentDto")
    @Mapping(source = "packageRef.name", target = "name")
    CPackageResponse toCPackageResponse(Comment comment);

    List<CommentDto> entityListToDtoList(List<Comment> commentList);

    List<Comment> dtoListToEntityList(List<CommentDto> commentDtoList);

}